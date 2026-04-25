import { Router } from 'itty-router';

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

const router = Router();

// Enable CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

router.options('*', () => new Response(null, { headers: corsHeaders }));

// GET all suggestions
router.get('/api/suggestions', async (req, { DB }: Env) => {
  try {
    const result = await DB.prepare(
      'SELECT * FROM suggestions ORDER BY timestamp DESC'
    ).all();
    return new Response(JSON.stringify(result.results || []), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch suggestions' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// POST new suggestion
router.post('/api/suggestions', async (req, { DB }: Env) => {
  try {
    const body = (await req.json()) as Omit<Suggestion, 'id'>;
    const id = Date.now().toString();

    await DB.prepare(
      'INSERT INTO suggestions (id, itemText, category, period, suggestion, timestamp) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(id, body.itemText, body.category, body.period, body.suggestion, body.timestamp).run();

    const result = await DB.prepare('SELECT * FROM suggestions WHERE id = ?').bind(id).first();
    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create suggestion' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// PUT update suggestion
router.put('/api/suggestions', async (req, { DB }: Env) => {
  try {
    const { id, suggestion } = (await req.json()) as { id: string; suggestion: string };

    await DB.prepare(
      'UPDATE suggestions SET suggestion = ? WHERE id = ?'
    ).bind(suggestion, id).run();

    const result = await DB.prepare('SELECT * FROM suggestions WHERE id = ?').bind(id).first();
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update suggestion' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// DELETE suggestion
router.delete('/api/suggestions', async (req, { DB }: Env) => {
  try {
    const { id } = (await req.json()) as { id: string };

    await DB.prepare('DELETE FROM suggestions WHERE id = ?').bind(id).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete suggestion' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

export default {
  fetch: router.handle,
} as ExportedHandler<Env>;
