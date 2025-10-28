// api/chat.js
// Serverless endpoint for GPT-5 mini chat (RAG-ready skeleton).
// Put your API key in an environment variable: OPENAI_API_KEY
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try{
    const { message } = req.body || {};
    if(!message || typeof message !== "string") return res.status(400).json({ error: "missing message" });

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // Minimal system prompt; keep it short to save tokens.
    const system = "Du bist der Support-Assistent von Droniq. Antworte kurz, sachlich, Deutsch bevorzugt, und hänge 1–2 Seitenlinks an, wenn sinnvoll.";
    const completion = await client.chat.completions.create({
      model: "gpt-5-mini",
      temperature: 0.3,
      max_tokens: 200,
      messages: [
        { role: "system", content: system },
        { role: "user", content: message }
      ]
    });
    const answer = completion.choices?.[0]?.message?.content || "Entschuldigung, keine Antwort.";
    res.status(200).json({ answer, citations: [] });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: "chat error" });
  }
}
