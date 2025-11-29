import fetch from 'node-fetch';

const JAN_API_KEY = 'myjan-apialihydrbot18qs';  // Jan.ai API key
const model = 'Phi-3_5-mini-instruct_IQ4_XS'; //  Jan.ai model
const message = "Hello"; // Test message

try {
  const response = await fetch('https://api.jan.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JAN_API_KEY}`
    },
    body: JSON.stringify({ model, input: message })
  });

  const text = await response.text();  // Get raw response
  console.log("RAW RESPONSE:", text);

} catch (err) {
  console.error("Fetch failed:", err);
}
