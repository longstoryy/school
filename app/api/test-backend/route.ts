import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test internal backend connection
    const apiUrl = process.env.API_URL_INTERNAL || process.env.NEXT_PUBLIC_API_URL;
    
    console.log('Testing backend connection to:', apiUrl);
    
    const response = await fetch(`${apiUrl}/health/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      backend_url: apiUrl,
      backend_response: data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Backend test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      backend_url: process.env.API_URL_INTERNAL || process.env.NEXT_PUBLIC_API_URL,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
