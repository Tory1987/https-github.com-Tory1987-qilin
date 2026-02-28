import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { createHmac } from 'node:crypto';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const PAYOS_API_URL = 'https://api-merchant.payos.vn/v2/payment-requests';

const PACKAGES: Record<string, { type: string; amount: number; hearts_qty: number | null; description: string }> = {
  hearts_5:  { type: 'hearts', amount: 10000,  hearts_qty: 5,  description: 'Mua 5 tim Qilin' },
  hearts_15: { type: 'hearts', amount: 20000,  hearts_qty: 15, description: 'Mua 15 tim Qilin' },
  hearts_50: { type: 'hearts', amount: 30000,  hearts_qty: 50, description: 'Mua 50 tim Qilin' },
  premium_year: { type: 'premium', amount: 499000, hearts_qty: null, description: 'Qilin Premium 1 nam' },
};

function createSignature(data: Record<string, unknown>, checksumKey: string): string {
  const sortedKeys = Object.keys(data).sort();
  const queryStr = sortedKeys.map(key => `${key}=${data[key]}`).join('&');
  return createHmac('sha256', checksumKey).update(queryStr).digest('hex');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const userId = claimsData.claims.sub;

    const { package_type } = await req.json();
    const pkg = PACKAGES[package_type];
    if (!pkg) {
      return new Response(JSON.stringify({ error: 'Gói không hợp lệ' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const clientId = Deno.env.get('VIETQR_CLIENT_ID');
    const apiKey = Deno.env.get('VIETQR_API_KEY');
    const checksumKey = Deno.env.get('VIETQR_CHECKSUM_KEY');

    if (!clientId || !apiKey || !checksumKey) {
      return new Response(JSON.stringify({ error: 'PayOS chưa được cấu hình' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const orderCode = Number(Date.now().toString().slice(-9) + Math.floor(Math.random() * 1000).toString().padStart(3, '0'));

    // Determine return URLs
    const appUrl = 'https://qilin.lovable.app';
    const paymentData = {
      orderCode,
      amount: pkg.amount,
      description: pkg.description.substring(0, 25),
      returnUrl: `${appUrl}/home`,
      cancelUrl: `${appUrl}/home`,
    };

    const signature = createSignature(paymentData, checksumKey);

    const response = await fetch(PAYOS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': clientId,
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ ...paymentData, signature }),
    });

    const result = await response.json();
    console.log('PayOS response:', JSON.stringify(result));

    if (result.code !== '00' || !result.data) {
      return new Response(JSON.stringify({ error: result.desc || 'Không thể tạo link thanh toán' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Save purchase record
    const supabaseAdmin = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    await supabaseAdmin.from('purchases').insert({
      user_id: userId,
      type: pkg.type,
      amount: pkg.amount,
      hearts_qty: pkg.hearts_qty,
      status: 'pending',
      order_code: orderCode.toString(),
      metadata: {
        package_type,
        payos_payment_link_id: result.data.paymentLinkId,
      },
      expires_at: pkg.type === 'premium' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : null,
    });

    return new Response(JSON.stringify({
      success: true,
      checkoutUrl: result.data.checkoutUrl,
      qrCode: result.data.qrCode,
      orderCode,
      accountNumber: result.data.accountNumber,
      accountName: result.data.accountName,
      bin: result.data.bin,
      description: result.data.description,
      amount: pkg.amount,
    }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Create payment error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
