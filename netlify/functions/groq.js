export default async (req, context) => {
  const { prompt } = await req.json();
  const apiKey = process.env.GROQ_API_KEY;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  return new Response(JSON.stringify({ answer: data.choices[0].message.content }), {
    headers: { "Content-Type": "application/json" }
  });
};
