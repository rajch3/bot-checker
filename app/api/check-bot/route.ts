import { checkBotId } from "botid/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { isBot } = await checkBotId();

    return NextResponse.json({
      isBot: isBot,
      verified: !isBot,
      message: isBot
        ? "Bot detected!"
        : "You appear to be human!",
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
