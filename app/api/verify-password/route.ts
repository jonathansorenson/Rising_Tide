import { NextRequest, NextResponse } from "next/server";

const DEAL_ROOM_PASSWORD = process.env.DEAL_ROOM_PASSWORD || "";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || password !== DEAL_ROOM_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
