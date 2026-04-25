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

// Enable CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const method = request.method;

    // Handle CORS
    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // GET all suggestions
    if (method === 'GET' && url.pathname === '/api/suggestions') {
      try {
        const result = await env.DB.prepare(
          'SELECT * FROM suggestions ORDER BY timestamp DESC'
        ).all();
        return new Response(JSON.stringify(result.results || []), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: 'Failed to fetch suggestions', details: error?.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // POST new suggestion
    if (method === 'POST' && url.pathname === '/api/suggestions') {
      try {
        const body = (await request.json()) as Omit<Suggestion, 'id'>;
        const id = Date.now().toString();

        await env.DB.prepare(
          'INSERT INTO suggestions (id, itemText, category, period, suggestion, timestamp) VALUES (?, ?, ?, ?, ?, ?)'
        ).bind(id, body.itemText, body.category, body.period, body.suggestion, body.timestamp).run();

        const result = await env.DB.prepare('SELECT * FROM suggestions WHERE id = ?').bind(id).first();
        return new Response(JSON.stringify(result), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: 'Failed to create suggestion', details: error?.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // PUT update suggestion
    if (method === 'PUT' && url.pathname === '/api/suggestions') {
      try {
        const { id, suggestion } = (await request.json()) as { id: string; suggestion: string };

        await env.DB.prepare(
          'UPDATE suggestions SET suggestion = ? WHERE id = ?'
        ).bind(suggestion, id).run();

        const result = await env.DB.prepare('SELECT * FROM suggestions WHERE id = ?').bind(id).first();
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: 'Failed to update suggestion', details: error?.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // DELETE suggestion
    if (method === 'DELETE' && url.pathname === '/api/suggestions') {
      try {
        const { id } = (await request.json()) as { id: string };

        await env.DB.prepare('DELETE FROM suggestions WHERE id = ?').bind(id).run();

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: 'Failed to delete suggestion', details: error?.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
} as ExportedHandler<Env>;
