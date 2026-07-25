export async function handler(event) {
  const { question } = JSON.parse(event.body);
  const API_KEY = process.env.GROQ_API_KEY; // Key yahan se aayegi

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: question }]
    })
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ answer: data.choices[0].message.content })
  };
}
