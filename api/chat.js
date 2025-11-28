import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  //  Jan.ai API key from Vercel Environment Variables
  const JAN_API_KEY = process.env.JAN_API_KEY;
  if (!JAN_API_KEY) {
    return res.status(500).json({ error: 'Missing JAN_API_KEY env variable' });
  }

  try {
    // Call Jan.ai API
    const response = await fetch('https://api.jan.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JAN_API_KEY}`
      },
      body: JSON.stringify({
        model: 'Phi-3_5-mini-instruct_IQ4_XS', // my Jan.ai model

        input: message
      })
    });

    const data = await response.json();

    // Extract the reply text
    const reply = data.outputText || data.output || (data?.data && data.data[0]?.text) || 'No response';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to contact Jan.ai', detail: err.message });
  }
}
