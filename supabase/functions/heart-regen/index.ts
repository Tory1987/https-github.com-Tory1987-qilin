import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function getAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

function b64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function b64dec(s: string): Uint8Array {
  const p = "=".repeat((4 - (s.length % 4)) % 4);
  const raw = atob((s + p).replace(/-/g, "+").replace(/_/g, "/"));
  const a = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) a[i] = raw.charCodeAt(i);
  return a;
}

async function getVapid() {
  const db = getAdmin();
  const { data } = await db
    .from("app_config")
    .select("key, value")
    .in("key", ["vapid_public_key", "vapid_private_jwk"]);
  const rows = (data || []) as Array<{ key: string; value: string }>;

  if (rows.length >= 2) {
    const pub = rows.find((r) => r.key === "vapid_public_key")!.value;
    const priv = JSON.parse(
      rows.find((r) => r.key === "vapid_private_jwk")!.value
    );
    const pk = await crypto.subtle.importKey(
      "jwk",
      priv,
      { name: "ECDSA", namedCurve: "P-256" },
      false,
      ["sign"]
    );
    return { pub, pk };
  }

  const kp = await crypto.subtle.generateKey(
    { name: "ECDSA", namedCurve: "P-256" },
    true,
    ["sign", "verify"]
  );
  const pubRaw = await crypto.subtle.exportKey("raw", kp.publicKey);
  const pub = b64url(pubRaw);
  const priv = await crypto.subtle.exportKey("jwk", kp.privateKey);

  await db.from("app_config").upsert([
    { key: "vapid_public_key", value: pub },
    { key: "vapid_private_jwk", value: JSON.stringify(priv) },
  ]);

  const pk = await crypto.subtle.importKey(
    "jwk",
    priv,
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  );
  return { pub, pk };
}

async function vapidJwt(aud: string, pk: CryptoKey): Promise<string> {
  const enc = new TextEncoder();
  const header = b64url(
    enc.encode(JSON.stringify({ typ: "JWT", alg: "ES256" })).buffer
  );
  const payload = b64url(
    enc.encode(
      JSON.stringify({
        aud,
        exp: Math.floor(Date.now() / 1000) + 43200,
        sub: "mailto:admin@qilin.vn",
      })
    ).buffer
  );

  const sigBuf = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    pk,
    enc.encode(header + "." + payload)
  );
  const sig = new Uint8Array(sigBuf);

  let r: Uint8Array;
  let s: Uint8Array;

  if (sig.length === 64) {
    r = sig.slice(0, 32);
    s = sig.slice(32);
  } else {
    let offset = 2;
    const rLen = sig[offset + 1];
    offset += 2;
    r = sig.slice(offset, offset + rLen);
    offset += rLen;
    const sLen = sig[offset + 1];
    offset += 2;
    s = sig.slice(offset, offset + sLen);
    if (r.length > 32) r = r.slice(r.length - 32);
    if (s.length > 32) s = s.slice(s.length - 32);
    if (r.length < 32) {
      const t = new Uint8Array(32);
      t.set(r, 32 - r.length);
      r = t;
    }
    if (s.length < 32) {
      const t = new Uint8Array(32);
      t.set(s, 32 - s.length);
      s = t;
    }
  }

  const raw = new Uint8Array(64);
  raw.set(r, 0);
  raw.set(s, 32);
  return header + "." + payload + "." + b64url(raw.buffer);
}

async function doHkdf(
  ikm: Uint8Array,
  salt: Uint8Array,
  info: Uint8Array,
  len: number
): Promise<Uint8Array> {
  const k = await crypto.subtle.importKey(
    "raw",
    ikm,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const prk = new Uint8Array(
    await crypto.subtle.sign(
      "HMAC",
      k,
      salt.length ? salt : new Uint8Array(32)
    )
  );
  const pk = await crypto.subtle.importKey(
    "raw",
    prk,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const ic = new Uint8Array(info.length + 1);
  ic.set(info);
  ic[info.length] = 1;
  return new Uint8Array(await crypto.subtle.sign("HMAC", pk, ic)).slice(
    0,
    len
  );
}

async function encryptPayload(p256dh: string, authStr: string, msg: string) {
  const cpub = b64dec(p256dh);
  const cauth = b64dec(authStr);
  const enc = new TextEncoder();

  const sk = await crypto.subtle.generateKey(
    { name: "ECDH", namedCurve: "P-256" },
    true,
    ["deriveBits"]
  );
  const spub = new Uint8Array(
    await crypto.subtle.exportKey("raw", sk.publicKey)
  );
  const ck = await crypto.subtle.importKey(
    "raw",
    cpub,
    { name: "ECDH", namedCurve: "P-256" },
    false,
    []
  );
  const shared = new Uint8Array(
    await crypto.subtle.deriveBits(
      { name: "ECDH", public: ck },
      sk.privateKey,
      256
    )
  );

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const prk = await doHkdf(
    shared,
    cauth,
    enc.encode("Content-Encoding: auth\0"),
    32
  );

  const lbl = enc.encode("P-256");
  const ctx = new Uint8Array(5 + 1 + 2 + cpub.length + 2 + spub.length);
  let o = 0;
  ctx.set(lbl, o);
  o += lbl.length;
  ctx[o++] = 0;
  ctx[o++] = 0;
  ctx[o++] = cpub.length;
  ctx.set(new Uint8Array(cpub), o);
  o += cpub.length;
  ctx[o++] = 0;
  ctx[o++] = spub.length;
  ctx.set(spub, o);

  const cl = enc.encode("Content-Encoding: aesgcm\0");
  const ci = new Uint8Array(cl.length + ctx.length);
  ci.set(cl);
  ci.set(ctx, cl.length);
  const cek = await doHkdf(prk, salt, ci, 16);

  const nl = enc.encode("Content-Encoding: nonce\0");
  const ni = new Uint8Array(nl.length + ctx.length);
  ni.set(nl);
  ni.set(ctx, nl.length);
  const nonce = await doHkdf(prk, salt, ni, 12);

  const pb = enc.encode(msg);
  const pad = new Uint8Array(2 + pb.length);
  pad.set(pb, 2);

  const ak = await crypto.subtle.importKey(
    "raw",
    cek,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
  const ed = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce }, ak, pad)
  );

  return { ed, salt, spub };
}

async function sendPush(
  endpoint: string,
  p256dh: string,
  auth: string,
  payload: string,
  vpub: string,
  vpk: CryptoKey
) {
  const u = new URL(endpoint);
  const jwt = await vapidJwt(u.protocol + "//" + u.host, vpk);
  const { ed, salt, spub } = await encryptPayload(p256dh, auth, payload);

  return fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: "WebPush " + jwt,
      "Crypto-Key": "dh=" + b64url(spub.buffer) + ";p256ecdsa=" + vpub,
      "Content-Encoding": "aesgcm",
      Encryption: "salt=" + b64url(salt.buffer),
      "Content-Type": "application/octet-stream",
      TTL: "86400",
    },
    body: ed,
  });
}

// ─── Heart regen logic ───
async function handleHeartRegen() {
  const supabase = getAdmin();
  const { data, error } = await supabase.rpc("regen_hearts");

  if (error) {
    const { error: updateError } = await supabase
      .from("user_progress")
      .update({ hearts: 5 } as any)
      .lt("hearts", 5);
    if (updateError) throw updateError;
  }

  return new Response(
    JSON.stringify({ success: true, message: "Hearts regenerated" }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

// ─── Push: get VAPID key ───
async function handleGetVapidKey() {
  const { pub } = await getVapid();
  return new Response(JSON.stringify({ publicKey: pub }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// ─── Push: subscribe ───
async function handleSubscribe(req: Request) {
  const ah = req.headers.get("Authorization");
  if (!ah) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const uc = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: ah } } }
  );
  const {
    data: { user },
  } = await uc.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { subscription: sub } = await req.json();
  await getAdmin()
    .from("push_subscriptions")
    .upsert(
      {
        user_id: user.id,
        endpoint: sub.endpoint,
        p256dh: sub.keys.p256dh,
        auth: sub.keys.auth,
      },
      { onConflict: "user_id,endpoint" }
    );

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// ─── Context-aware messages by time of day ───
function getContextMessage(period: string, streak: number) {
  if (period === "morning") {
    if (streak > 0) {
      return {
        title: `☀️ Chào buổi sáng! Streak ${streak} ngày`,
        body: "Bắt đầu ngày mới bằng một bài học tiếng Trung nhé! 加油！",
      };
    }
    return {
      title: "☀️ Chào buổi sáng!",
      body: "Thức dậy rồi thì học tiếng Trung thôi! Qilin đang chờ bạn 🐉",
    };
  }
  if (period === "noon") {
    if (streak > 0) {
      return {
        title: `🍜 Nghỉ trưa rồi! Streak ${streak} ngày`,
        body: "Tranh thủ giờ nghỉ trưa ôn vài từ vựng nhé!",
      };
    }
    return {
      title: "🍜 Giờ nghỉ trưa rồi!",
      body: "Dành 5 phút học tiếng Trung cùng Qilin nhé!",
    };
  }
  // evening
  if (streak > 0) {
    return {
      title: `🌙 Tối rồi! Streak ${streak} ngày sắp mất!`,
      body: "Chưa học hôm nay? Vào ngay kẻo mất streak! 🔥",
    };
  }
  return {
    title: "🌙 Qilin nhớ bạn rồi!",
    body: "Trước khi ngủ, học vài từ mới nhé! 晚安 💤",
  };
}

// ─── Push: subscribe native (FCM/APNs) ───
async function handleSubscribeNative(req: Request) {
  const ah = req.headers.get("Authorization");
  if (!ah) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const uc = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: ah } } }
  );
  const { data: { user } } = await uc.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { token, platform } = await req.json();
  if (!token || !platform) {
    return new Response(JSON.stringify({ error: "Missing token or platform" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Store native token using endpoint convention: fcm://TOKEN or apns://TOKEN
  const endpoint = `${platform === "ios" ? "apns" : "fcm"}://${token}`;

  await getAdmin()
    .from("push_subscriptions")
    .upsert(
      {
        user_id: user.id,
        endpoint,
        p256dh: `native-${platform}`,
        auth: `native-${platform}`,
      },
      { onConflict: "user_id,endpoint" }
    );

  return new Response(JSON.stringify({ success: true, platform }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// ─── Push: send reminders ───
async function handleSendReminders(period: string) {
  const db = getAdmin();
  const { pub, pk } = await getVapid();
  const { data: subs } = await db.from("push_subscriptions").select("*");

  if (!subs?.length) {
    return new Response(JSON.stringify({ sent: 0, period }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const today = new Date().toISOString().split("T")[0];
  const uids = [...new Set(subs.map((s: any) => s.user_id))];
  const { data: prog } = await db
    .from("user_progress")
    .select("user_id, last_study_date, streak")
    .in("user_id", uids);

  const pm = new Map((prog || []).map((p: any) => [p.user_id, p]));

  let sent = 0;
  let skippedStudiedToday = 0;
  const dead: string[] = [];

  for (const sub of subs as any[]) {
    const p = pm.get(sub.user_id) as any;
    if (p?.last_study_date === today) {
      skippedStudiedToday++;
      continue;
    }

    const streak = p?.streak || 0;
    const { title, body } = getContextMessage(period, streak);
    const isNative = sub.endpoint.startsWith("fcm://") || sub.endpoint.startsWith("apns://");

    if (isNative) {
      // Native push via FCM HTTP v1 API (for both Android FCM and iOS via FCM)
      try {
        const fcmResult = await sendFcmPush(sub.endpoint, title, body);
        if (fcmResult === "ok") sent++;
        else if (fcmResult === "dead") dead.push(sub.endpoint);
      } catch (e) {
        console.error("Native push err:", e);
      }
      continue;
    }

    // Web Push
    try {
      const r = await sendPush(
        sub.endpoint,
        sub.p256dh,
        sub.auth,
        JSON.stringify({ title, body, icon: "/pwa-icon-192.png" }),
        pub,
        pk
      );
      if (r.ok) {
        sent++;
      } else if (r.status === 410 || r.status === 404) {
        dead.push(sub.endpoint);
      } else {
        const t = await r.text();
        console.error("Push fail:", r.status, t);
      }
    } catch (e) {
      console.error("Push err:", e);
    }
  }

  if (dead.length) {
    await db.from("push_subscriptions").delete().in("endpoint", dead);
  }

  return new Response(
    JSON.stringify({ sent, cleaned: dead.length, skippedStudiedToday, period }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

// ─── FCM HTTP v1 API (Service Account + OAuth2) ───

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

async function getFirebaseAccessToken(): Promise<{ token: string; projectId: string }> {
  const saJson = Deno.env.get("FIREBASE_SERVICE_ACCOUNT");
  if (!saJson) throw new Error("FIREBASE_SERVICE_ACCOUNT not configured");

  const sa = JSON.parse(saJson);
  const { client_email, private_key, project_id } = sa;

  // Return cached token if still valid (with 5min buffer)
  if (cachedAccessToken && Date.now() < cachedAccessToken.expiresAt - 300_000) {
    return { token: cachedAccessToken.token, projectId: project_id };
  }

  // Build JWT for Google OAuth2
  const now = Math.floor(Date.now() / 1000);
  const enc = new TextEncoder();

  const header = b64url(enc.encode(JSON.stringify({ alg: "RS256", typ: "JWT" })).buffer);
  const claims = b64url(enc.encode(JSON.stringify({
    iss: client_email,
    sub: client_email,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
  })).buffer);

  // Import RSA private key
  const pemBody = private_key
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\n/g, "");
  const keyBuf = Uint8Array.from(atob(pemBody), (c: string) => c.charCodeAt(0));

  const rsaKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBuf,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sigBuf = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    rsaKey,
    enc.encode(`${header}.${claims}`)
  );
  const jwt = `${header}.${claims}.${b64url(sigBuf)}`;

  // Exchange JWT for access token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!tokenRes.ok) {
    const txt = await tokenRes.text();
    throw new Error(`OAuth2 token exchange failed: ${tokenRes.status} ${txt}`);
  }

  const tokenData = await tokenRes.json();
  cachedAccessToken = {
    token: tokenData.access_token,
    expiresAt: Date.now() + (tokenData.expires_in || 3600) * 1000,
  };

  return { token: cachedAccessToken.token, projectId: project_id };
}

async function sendFcmPush(endpoint: string, title: string, body: string): Promise<string> {
  let accessToken: string;
  let projectId: string;
  try {
    const result = await getFirebaseAccessToken();
    accessToken = result.token;
    projectId = result.projectId;
  } catch (e) {
    console.warn("Firebase auth failed, skipping native push:", e);
    return "skip";
  }

  const token = endpoint.replace(/^(fcm|apns):\/\//, "");

  const res = await fetch(
    `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          token,
          notification: { title, body },
          data: { title, body },
        },
      }),
    }
  );

  if (!res.ok) {
    const txt = await res.text();
    console.error("FCM v1 error:", res.status, txt);
    // Check for UNREGISTERED token
    if (txt.includes("UNREGISTERED") || txt.includes("NOT_FOUND")) {
      return "dead";
    }
    return "error";
  }

  await res.text(); // consume body
  return "ok";
}

// ─── Push: send test to current user ───
async function handleSendTest(req: Request) {
  const ah = req.headers.get("Authorization");
  if (!ah) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const uc = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: ah } } }
  );
  const {
    data: { user },
  } = await uc.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const db = getAdmin();
  const { pub, pk } = await getVapid();
  const { data: subs } = await db
    .from("push_subscriptions")
    .select("*")
    .eq("user_id", user.id);

  if (!subs?.length) {
    return new Response(JSON.stringify({ error: "No subscriptions" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let sent = 0;
  const dead: string[] = [];
  const title = "🧪 Test thông báo Qilin";
  const body = "Nếu bạn thấy thông báo này trên iPhone, push đang hoạt động.";

  for (const sub of subs as any[]) {
    const isNative =
      sub.endpoint.startsWith("fcm://") || sub.endpoint.startsWith("apns://");

    if (isNative) {
      try {
        const fcmResult = await sendFcmPush(sub.endpoint, title, body);
        if (fcmResult === "ok") sent++;
        else if (fcmResult === "dead") dead.push(sub.endpoint);
      } catch (e) {
        console.error("Native test push err:", e);
      }
      continue;
    }

    try {
      const r = await sendPush(
        sub.endpoint,
        sub.p256dh,
        sub.auth,
        JSON.stringify({ title, body, icon: "/pwa-icon-192.png" }),
        pub,
        pk
      );

      if (r.ok) {
        sent++;
      } else if (r.status === 410 || r.status === 404) {
        dead.push(sub.endpoint);
      } else {
        const t = await r.text();
        console.error("Test push fail:", r.status, t);
      }
    } catch (e) {
      console.error("Test push err:", e);
    }
  }

  if (dead.length) {
    await db.from("push_subscriptions").delete().in("endpoint", dead);
  }

  return new Response(
    JSON.stringify({
      success: true,
      sent,
      cleaned: dead.length,
      subscriptions: subs.length,
      user_id: user.id,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

// ─── Push: unsubscribe-all ───
async function handleUnsubscribeAll(req: Request) {
  const ah = req.headers.get("Authorization");
  if (!ah) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const uc = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: ah } } }
  );
  const { data: { user } } = await uc.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { error } = await getAdmin()
    .from("push_subscriptions")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    console.error("Unsubscribe-all error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// ─── Main handler ───
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (!action) {
      return await handleHeartRegen();
    }
    if (action === "get-vapid-key") {
      return await handleGetVapidKey();
    }
    if (action === "subscribe") {
      return await handleSubscribe(req);
    }
    if (action === "subscribe-native") {
      return await handleSubscribeNative(req);
    }
    if (action === "send-reminders") {
      const period = url.searchParams.get("period") || "noon";
      return await handleSendReminders(period);
    }
    if (action === "send-test") {
      return await handleSendTest(req);
    }
    if (action === "unsubscribe-all") {
      return await handleUnsubscribeAll(req);
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
