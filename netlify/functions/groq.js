export async function handler(event) {
  const { prompt } = JSON.parse(event.body);
  const apiKey = process.env.GROQ_API_KEY;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "Tum AI Tutor ho. Lazmi rule: Har jawab ki shuruat 'Ji' ya 'Yes' se karni hai. Naam mat lena. Jawab Urdu me, saaf aur mukhtasir do." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ answer: data.choices[0].message.content })
  };
}
