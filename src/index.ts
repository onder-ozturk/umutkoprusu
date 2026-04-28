interface Suggestion {
  id: string;
  itemText: string;
  category: string;
  period: string;
  suggestion: string;
  timestamp: number;
}

interface Env {
  DB: D1Database;
}

interface UserRow {
  email: string;
  password_hash: string;
  password_salt: string;
  password_iterations: number;
}

interface SessionRow {
  token: string;
  email: string;
  expires_at: number;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const PBKDF2_KEY_BYTES = 32;

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function pbkdf2Hash(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: salt as BufferSource, iterations, hash: 'SHA-256' },
    keyMaterial,
    PBKDF2_KEY_BYTES * 8
  );
  return new Uint8Array(bits);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytesToBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function verifyToken(env: Env, token: string | null): Promise<SessionRow | null> {
  if (!token) return null;
  const row = await env.DB.prepare('SELECT token, email, expires_at FROM sessions WHERE token = ?')
    .bind(token)
    .first<SessionRow>();
  if (!row) return null;
  if (row.expires_at < Date.now()) {
    await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
    return null;
  }
  return row;
}

function extractBearer(request: Request): string | null {
  const header = request.headers.get('Authorization') || request.headers.get('authorization');
  if (!header) return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

async function recordAuthLog(
  env: Env,
  request: Request,
  email: string | null,
  success: boolean,
  reason: string
): Promise<void> {
  try {
    const ip =
      request.headers.get('CF-Connecting-IP') ||
      request.headers.get('X-Forwarded-For') ||
      null;
    const country = request.headers.get('CF-IPCountry') || null;
    const userAgent = request.headers.get('User-Agent') || null;
    await env.DB.prepare(
      'INSERT INTO auth_logs (email, success, reason, ip, country, user_agent, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
      .bind(email, success ? 1 : 0, reason, ip, country, userAgent, Date.now())
      .run();
  } catch (err) {
    console.error('auth log insert failed', err);
  }
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const method = request.method;

    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // ── AUTH ────────────────────────────────────────────────────────────
    if (method === 'POST' && url.pathname === '/api/auth/login') {
      let attemptedEmail: string | null = null;
      try {
        const { email, password } = (await request.json()) as { email?: string; password?: string };
        attemptedEmail = email ? email.toLowerCase().trim() : null;
        if (!email || !password) {
          await recordAuthLog(env, request, attemptedEmail, false, 'missing_fields');
          return jsonResponse({ error: 'E-posta ve şifre gerekli.' }, 400);
        }
        const user = await env.DB.prepare(
          'SELECT email, password_hash, password_salt, password_iterations FROM users WHERE email = ?'
        )
          .bind(attemptedEmail)
          .first<UserRow>();
        if (!user) {
          await recordAuthLog(env, request, attemptedEmail, false, 'user_not_found');
          return jsonResponse({ error: 'E-posta veya şifre hatalı.' }, 401);
        }
        const salt = base64ToBytes(user.password_salt);
        const expected = base64ToBytes(user.password_hash);
        const computed = await pbkdf2Hash(password, salt, user.password_iterations);
        if (!timingSafeEqual(expected, computed)) {
          await recordAuthLog(env, request, attemptedEmail, false, 'wrong_password');
          return jsonResponse({ error: 'E-posta veya şifre hatalı.' }, 401);
        }

        const token = generateToken();
        const now = Date.now();
        const expires = now + SESSION_TTL_MS;
        await env.DB.prepare(
          'INSERT INTO sessions (token, email, expires_at, created_at) VALUES (?, ?, ?, ?)'
        )
          .bind(token, user.email, expires, now)
          .run();
        await recordAuthLog(env, request, user.email, true, 'ok');
        return jsonResponse({ token, email: user.email, expires_at: expires });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        await recordAuthLog(env, request, attemptedEmail, false, 'error');
        return jsonResponse({ error: 'Giriş başarısız.', details: message }, 500);
      }
    }

    if (method === 'GET' && url.pathname === '/api/auth/verify') {
      const session = await verifyToken(env, extractBearer(request));
      if (!session) return jsonResponse({ error: 'Geçersiz veya süresi dolmuş oturum.' }, 401);
      return jsonResponse({ email: session.email, expires_at: session.expires_at });
    }

    if (method === 'POST' && url.pathname === '/api/auth/logout') {
      const token = extractBearer(request);
      if (token) {
        await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
      }
      return jsonResponse({ success: true });
    }

    // ── SUGGESTIONS ─────────────────────────────────────────────────────
    if (method === 'GET' && url.pathname === '/api/suggestions') {
      try {
        const result = await env.DB.prepare(
          'SELECT * FROM suggestions ORDER BY timestamp DESC'
        ).all();
        return jsonResponse(result.results || []);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return jsonResponse({ error: 'Failed to fetch suggestions', details: message }, 500);
      }
    }

    // Mutations require a valid session token
    if (
      url.pathname === '/api/suggestions' &&
      (method === 'POST' || method === 'PUT' || method === 'DELETE')
    ) {
      const session = await verifyToken(env, extractBearer(request));
      if (!session) return jsonResponse({ error: 'Yetkisiz.' }, 401);

      try {
        if (method === 'POST') {
          const body = (await request.json()) as Omit<Suggestion, 'id'>;
          const id = Date.now().toString();
          await env.DB.prepare(
            'INSERT INTO suggestions (id, itemText, category, period, suggestion, timestamp) VALUES (?, ?, ?, ?, ?, ?)'
          )
            .bind(id, body.itemText, body.category, body.period, body.suggestion, body.timestamp)
            .run();
          const result = await env.DB.prepare('SELECT * FROM suggestions WHERE id = ?').bind(id).first();
          return jsonResponse(result, 201);
        }

        if (method === 'PUT') {
          const { id, suggestion } = (await request.json()) as { id: string; suggestion: string };
          await env.DB.prepare('UPDATE suggestions SET suggestion = ? WHERE id = ?')
            .bind(suggestion, id)
            .run();
          const result = await env.DB.prepare('SELECT * FROM suggestions WHERE id = ?').bind(id).first();
          return jsonResponse(result);
        }

        // DELETE
        const { id } = (await request.json()) as { id: string };
        await env.DB.prepare('DELETE FROM suggestions WHERE id = ?').bind(id).run();
        return jsonResponse({ success: true });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return jsonResponse({ error: 'Suggestion mutation failed', details: message }, 500);
      }
    }

    return jsonResponse({ error: 'Not found' }, 404);
  },
} as ExportedHandler<Env>;
