import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: "API key missing",
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: "Say hello like a marketing expert" }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      success: true,
      status: response.status,
      data,
    });
  } catch (error: any) {
    console.error("ERROR:", error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}