import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
      return NextResponse.json({
        success: false,
        error: "Unsplash API key missing",
      });
    }

    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=business&client_id=${accessKey}`
    );

    const data = await response.json();

    return NextResponse.json({
      success: true,
      image: data?.urls?.regular,
      photographer: data?.user?.name,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}