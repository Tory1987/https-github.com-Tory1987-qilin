import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { createHmac } from 'node:crypto';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function convertDataToQueryStr(data: Record<string, unknown>): string {
  const sortedKeys = Object.keys(data).sort();
  const parts: string[] = [];
  for (const key of sortedKeys) {
    let value = data[key];
    if (value === null || value === undefined) value = '';
    if (Array.isArray(value)) {
      const sortedArr = value.map((ele: unknown) => {
        if (ele && typeof ele === 'object' && !Array.isArray(ele)) {
          const sorted: Record<string, unknown> = {};
          Object.keys(ele as Record<string, unknown>).sort().forEach(k => {
            sorted[k] = (ele as Record<string, unknown>)[k];
          });
          return sorted;
        }
        return ele;
      });
      value = JSON.stringify(sortedArr);
    }
    parts.push(`${key}=${value}`);
  }
  return parts.join('&');
}

function verifyWebhookSignature(data: Record<string, unknown>, signature: string, checksumKey: string): boolean {
  try {
    const queryStr = convertDataToQueryStr(data);
    const expected = createHmac('sha256', checksumKey).update(queryStr).digest('hex');
    console.log('Sig check - expected:', expected, 'received:', signature);
    return expected === signature;
  } catch { return false; }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const rawBody = await req.text();
    console.log('Webhook received:', rawBody);

    const body = JSON.parse(rawBody);

    // Verify signature
    const checksumKey = Deno.env.get('VIETQR_CHECKSUM_KEY');
    if (checksumKey && body.signature) {
      if (!verifyWebhookSignature(body.data, body.signature, checksumKey)) {
        console.error('Invalid webhook signature');
        return new Response(JSON.stringify({ error: 'Invalid signature' }), {
          status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    if (!body.data) {
      return new Response(JSON.stringify({ success: true, message: 'No data' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const orderCode = body.data.orderCode?.toString();
    if (!orderCode) {
      return new Response(JSON.stringify({ success: true, message: 'No orderCode' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const db = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    // Find matching purchase
    const { data: purchase, error: fetchErr } = await db
      .from('purchases')
      .select('*')
      .eq('order_code', orderCode)
      .eq('status', 'pending')
      .maybeSingle();

    if (fetchErr || !purchase) {
      console.log('No matching purchase for orderCode:', orderCode);
      return new Response(JSON.stringify({ success: true, message: 'No matching purchase' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify amount
    if (Math.abs(purchase.amount - body.data.amount) > 100) {
      console.error(`Amount mismatch: expected ${purchase.amount}, got ${body.data.amount}`);
      await db.from('purchases').update({ status: 'failed', metadata: { ...((purchase.metadata as any) || {}), error: 'Amount mismatch' } }).eq('id', purchase.id);
      return new Response(JSON.stringify({ error: 'Amount mismatch' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Mark purchase as success
    await db.from('purchases').update({
      status: 'success',
      metadata: {
        ...((purchase.metadata as any) || {}),
        webhookReceivedAt: new Date().toISOString(),
        reference: body.data.reference,
      },
    }).eq('id', purchase.id);

    // Apply reward
    if (purchase.type === 'hearts' && purchase.hearts_qty) {
      // Add hearts
      const { data: progress } = await db.from('user_progress').select('hearts, max_hearts').eq('user_id', purchase.user_id).single();
      if (progress) {
        const newHearts = progress.hearts + purchase.hearts_qty;
        await db.from('user_progress').update({ hearts: newHearts }).eq('user_id', purchase.user_id);
      }
      console.log(`Added ${purchase.hearts_qty} hearts for user ${purchase.user_id}`);
    } else if (purchase.type === 'premium') {
      // Set premium_until to 1 year from now
      const premiumUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
      await db.from('user_progress').update({ premium_until: premiumUntil } as any).eq('user_id', purchase.user_id);
      console.log(`Premium activated until ${premiumUntil} for user ${purchase.user_id}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
