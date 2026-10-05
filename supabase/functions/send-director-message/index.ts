// Edge Function: приём обращения к руководителю и отправка письма на рабочую почту.
// Все настройки почты берутся ТОЛЬКО из переменных окружения (secrets):
//   MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, DIRECTOR_EMAIL
//   (необязательно) MAIL_FROM — адрес отправителя (по умолчанию MAIL_USER),
//   MAIL_SECURE — "true"/"false" (по умолчанию true для порта 465),
//   IP_HASH_SALT — соль для хеширования IP.
// SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY Supabase подставляет автоматически.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { escapeHtml, LIMITS, sanitizeLine, validateInput } from './validation.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

const MAX_BODY_BYTES = 8 * 1024;
const PER_IP_HOUR = 3;
const PER_IP_DAY = 10;
const PER_EMAIL_HOUR = 3;

const sha256 = async (text: string) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' });

  // --- Размер и формат тела ---
  const rawBody = await req.text();
  if (rawBody.length > MAX_BODY_BYTES) return json(413, { error: 'too_large' });
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) throw new Error();
  } catch {
    return json(400, { error: 'bad_request' });
  }

  // --- Anti-spam: honeypot и слишком быстрая отправка. Ботам "успех" не мешаем видеть. ---
  const elapsed = Number(payload.elapsed);
  if (sanitizeLine(payload.website) !== '' || (Number.isFinite(elapsed) && elapsed < LIMITS.minElapsedMs)) {
    return json(200, { ok: true });
  }

  // --- Серверная валидация ---
  const result = validateInput(payload);
  if (!result.ok) return json(400, { error: 'validation', fields: result.errors });
  const { name, phone, email, message } = result.value;

  // --- Конфигурация (не хранится в коде) ---
  const env = (k: string) => Deno.env.get(k) ?? '';
  const host = env('MAIL_HOST'), port = Number(env('MAIL_PORT') || 465);
  const user = env('MAIL_USER'), pass = env('MAIL_PASSWORD'), to = env('DIRECTOR_EMAIL');
  const from = env('MAIL_FROM') || user;
  if (!host || !user || !pass || !to) {
    console.error('Mail is not configured: set MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, DIRECTOR_EMAIL');
    return json(500, { error: 'not_configured' });
  }

  const supabase = createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'), {
    auth: { persistSession: false },
  });

  // --- Ограничение частоты запросов (по IP и по e-mail) ---
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  const ipHash = await sha256(`${env('IP_HASH_SALT') || 'director-messages'}:${ip}`);
  const hourAgo = new Date(Date.now() - 3600_000).toISOString();
  const dayAgo = new Date(Date.now() - 86_400_000).toISOString();

  const count = async (col: 'ip_hash' | 'email', val: string, since: string) => {
    const { count: c, error } = await supabase.from('director_messages')
      .select('id', { count: 'exact', head: true }).eq(col, val).gte('created_at', since);
    if (error) throw error;
    return c ?? 0;
  };
  try {
    const [ipHour, ipDay, emailHour] = await Promise.all([
      count('ip_hash', ipHash, hourAgo), count('ip_hash', ipHash, dayAgo), count('email', email, hourAgo),
    ]);
    if (ipHour >= PER_IP_HOUR || ipDay >= PER_IP_DAY || emailHour >= PER_EMAIL_HOUR) {
      return json(429, { error: 'rate_limited' });
    }
  } catch (e) {
    console.error('rate limit check failed', e);
    return json(500, { error: 'server_error' });
  }

  // --- Сохраняем обращение (чтобы оно не потерялось, даже если почта временно недоступна) ---
  const { data: saved, error: insertError } = await supabase.from('director_messages')
    .insert({ name, phone, email, message, ip_hash: ipHash, mail_sent: false })
    .select('id').single();
  if (insertError || !saved) {
    console.error('insert failed', insertError);
    return json(500, { error: 'server_error' });
  }

  // --- Отправка письма ---
  const safe = { name: escapeHtml(name), phone: escapeHtml(phone || '—'), email: escapeHtml(email), message: escapeHtml(message).replace(/\n/g, '<br>') };
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#1f2937">
<h2 style="margin:0 0 12px">Новое обращение к руководителю</h2>
<p><b>Имя:</b> ${safe.name}<br><b>Телефон:</b> ${safe.phone}<br><b>E-mail:</b> ${safe.email}</p>
<p><b>Сообщение:</b></p><p style="white-space:pre-wrap">${safe.message}</p>
<hr style="border:none;border-top:1px solid #e5e7eb"><p style="color:#6b7280;font-size:12px">Отправлено с сайта Центра спортивной медицины Актюбинской области.</p></div>`;
  const text = `Новое обращение к руководителю\n\nИмя: ${name}\nТелефон: ${phone || '—'}\nE-mail: ${email}\n\nСообщение:\n${message}\n`;

  const secure = env('MAIL_SECURE') ? env('MAIL_SECURE') === 'true' : port === 465;
  const client = new SMTPClient({
    connection: { hostname: host, port, tls: secure, auth: { username: user, password: pass } },
  });
  try {
    await client.send({
      from,
      to,
      replyTo: email,
      subject: `Обращение к руководителю: ${name}`.slice(0, 150),
      content: text,
      html,
    });
    await supabase.from('director_messages').update({ mail_sent: true }).eq('id', saved.id);
    return json(200, { ok: true });
  } catch (e) {
    console.error('mail send failed', e);
    return json(502, { error: 'mail_failed' });
  } finally {
    try { await client.close(); } catch { /* ignore */ }
  }
});
