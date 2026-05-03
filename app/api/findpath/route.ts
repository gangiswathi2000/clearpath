import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ response: "Please describe your situation." });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      // We enable Google Search grounding tool for real-time benefits search
      // @ts-ignore
      tools: [{ googleSearch: {} }],
    });

    const systemInstruction = `You are the FindPath AI assistant for the ClearPath app.
Your goal is to help users find US benefits programs (federal and state level) they qualify for based on their situation.
Use Google Search Grounding to find the most accurate and up-to-date information on eligibility and benefit amounts.
Whenever you find a program, format it clearly with bullet points and provide the direct URL link.
If you need more information like state, income, or household size, ask the user. Keep your responses concise and easy to read.`;

    // Convert chat history format from our UI to Gemini format
    let history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    // Gemini API requires that history starts with a user message
    while (history.length > 0 && history[0].role === "model") {
      history.shift();
    }

    const chat = model.startChat({
      // @ts-ignore
      systemInstruction: { role: "system", parts: [{ text: systemInstruction }] },
      history: history,
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error("FindPath API Error:", error);
    return NextResponse.json({ 
      response: "API Error: " + (error.message || "An error occurred while communicating with the AI. Please check your API key and connection.") 
    }, { status: 500 });
  }
}
