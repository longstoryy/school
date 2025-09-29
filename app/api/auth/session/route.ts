import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Return a mock session for development
    const mockSession = {
      user: {
        id: "1",
        name: "Admin User",
        email: "admin@school.com",
        role: "admin"
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
    return NextResponse.json(mockSession);
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(null);
  }
}
