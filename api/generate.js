export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { bio } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          response_format: {
            type: "json_object"
          },
          messages: [
            {
              role: "system",
              content: `Reply ONLY valid JSON.

{
"roast":"",
"hype":"",
"vibe":""
}

Roast should be funny.
Hype should be motivating.
Vibe should be 2-4 words only.`
            },
            {
              role: "user",
              content: bio
            }
          ]
        })
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (err) {
    return res.status(500).json({
      error: {
        message: err.message
      }
    });
  }

}
