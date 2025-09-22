import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    return NextResponse.json(session);
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(null);
  }
}
