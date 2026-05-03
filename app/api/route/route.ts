import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ route: "/findpath" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `You are an intelligent router for the ClearPath benefits navigation app.
    Given the user's message, determine which module they should be routed to.
    
    Modules:
    - "/appealbot": If the user mentions being denied, rejected, or wanting to appeal a decision.
    - "/vetpath": If the user mentions being a veteran, serving in the military, VA, or military branches.
    - "/proofbot": If the user asks about what documents they need to apply, or mentions proving eligibility.
    - "/findpath": If the user is asking general questions about what they qualify for, mentions their income, situation, or needs help finding benefits.
    
    User message: "${message}"
    
    Return a JSON object with exactly one key "route" containing the matching module path.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const json = JSON.parse(text);

    return NextResponse.json({ route: json.route || "/findpath" });
  } catch (error) {
    console.error("Smart Router Error:", error);
    return NextResponse.json({ route: "/findpath" });
  }
}
