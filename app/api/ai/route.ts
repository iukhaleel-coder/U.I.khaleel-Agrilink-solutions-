// app/api/ai/route.ts
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an expert agricultural assistant for U.I Khaleel Agrilink Solutions,
a Nigerian agribusiness company based in Kano State. Help farmers with: crop production (maize, rice,
soybeans, cowpea, groundnut, sesame, millet, sorghum), livestock, poultry, fish farming, pest
management, soil fertility, weather-based farming decisions, market prices and agribusiness in Nigeria.
Be practical, concise (3-5 sentences), and friendly. Use simple English. If the user writes in Hausa,
respond in Hausa.`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply:
          "Thank you for your question! Our agricultural experts will provide detailed guidance. " +
          "For urgent farming advice, please call us on 08034838198 or WhatsApp us at +2348034838198.",
      });
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "I couldn't process that. Please try again or call 08034838198 for direct support.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json({
      reply: "Our AI assistant is temporarily unavailable. Please call 08034838198 for immediate farming support.",
    });
  }
}
