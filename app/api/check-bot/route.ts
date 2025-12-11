import { checkBotId } from "@vercel/botid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const result = await checkBotId(request);

    return NextResponse.json({
      isBot: !result.verified,
      verified: result.verified,
      message: result.verified
        ? "You appear to be human!"
        : "Bot detected!",
    });
  } catch (error) {
    console.error("BotID check error:", error);
    return NextResponse.json(
      {
        isBot: null,
        verified: null,
        message: "Error checking bot status",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
