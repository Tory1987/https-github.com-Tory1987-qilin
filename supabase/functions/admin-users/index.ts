import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify caller is admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { data: { user }, error: authError } = await anonClient.auth.getUser(authHeader.replace("Bearer ", ""));
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check admin role using service role client
    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const { data: roleData } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (req.method === "GET") {
      // List all users with profiles and progress
      const { data: users, error } = await adminClient.auth.admin.listUsers({ perPage: 500 });
      if (error) throw error;

      const { data: profiles } = await adminClient.from("profiles").select("*");
      const { data: progress } = await adminClient.from("user_progress").select("*");
      const { data: roles } = await adminClient.from("user_roles").select("*");

      const profileMap = new Map((profiles || []).map((p: any) => [p.user_id, p]));
      const progressMap = new Map((progress || []).map((p: any) => [p.user_id, p]));
      const roleMap = new Map<string, string[]>();
      (roles || []).forEach((r: any) => {
        const existing = roleMap.get(r.user_id) || [];
        existing.push(r.role);
        roleMap.set(r.user_id, existing);
      });

      const result = users.users.map((u: any) => ({
        id: u.id,
        email: u.email,
        created_at: u.created_at,
        profile: profileMap.get(u.id) || null,
        progress: progressMap.get(u.id) || null,
        roles: roleMap.get(u.id) || ["user"],
      }));

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "POST") {
      const body = await req.json();

      if (body.action === "toggle_admin") {
        const targetUserId = body.user_id;
        const makeAdmin = body.make_admin;

        if (makeAdmin) {
          await adminClient.from("user_roles").insert({ user_id: targetUserId, role: "admin" });
        } else {
          // Don't allow removing own admin role
          if (targetUserId === user.id) {
            return new Response(JSON.stringify({ error: "Không thể tự xóa quyền admin" }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          await adminClient.from("user_roles").delete().eq("user_id", targetUserId).eq("role", "admin");
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "Unknown action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
