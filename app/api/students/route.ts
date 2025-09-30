import { NextRequest, NextResponse } from 'next/server';

// Django backend URL - adjust this to match your Django server
const DJANGO_API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.DJANGO_API_URL || 'http://localhost:8000/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Map Next.js form data to Django API format
    const djangoData = {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email || null,
      phone_number: body.phone_number || null,
      date_of_birth: body.date_of_birth || null,
      gender: body.gender ? body.gender.toUpperCase().charAt(0) : null, // Convert to Django format (M/F/O)
      
      // Parent/Guardian info
      father_name: body.father_name || null,
      mother_name: body.mother_name || null,
      guardian_name: body.guardian_name || null,
      father_phone: body.parent_phone || null,
      mother_phone: body.parent_phone || null,
      guardian_phone: body.parent_phone || null,
      father_email: body.parent_email || null,
      mother_email: body.parent_email || null,
      guardian_email: body.parent_email || null,
      
      // Academic info
      current_class: body.current_class || null,
      student_id: body.admission_number || null,
      admission_date: body.admission_date || new Date().toISOString().split('T')[0],
      
      // Address (map to Django's address fields)
      address_line_1: body.current_address || 'Not provided',
      city: 'Not provided',
      county: 'Not provided',
      postal_code: 'Not provided',
      
      // Emergency contact (required in Django)
      emergency_contact_name: body.father_name || body.mother_name || body.guardian_name || 'Not provided',
      emergency_contact_phone: body.parent_phone || 'Not provided',
      emergency_contact_relationship: body.guardian_type === 'parents' ? 'Parent' : 'Guardian',
      
      // Default values for required fields
      nationality: 'British',
      country: 'United Kingdom'
    };

    // Forward request to Django API
    const response = await fetch(`${DJANGO_API_URL}/students/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers if needed
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(djangoData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || errorData.message || 'Failed to create student' },
        { status: response.status }
      );
    }

    const student = await response.json();

    return NextResponse.json({
      message: 'Student created successfully',
      student,
      defaultPassword: 'student123' // Default password for new students
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('limit') || '10';
    const search = searchParams.get('search') || '';
    const classFilter = searchParams.get('class') || '';

    // Build query parameters for Django API
    const params = new URLSearchParams({
      page,
      page_size: pageSize,
    });

    if (search) {
      params.append('search', search);
    }
    
    if (classFilter) {
      params.append('current_class', classFilter);
    }

    // Forward request to Django API
    const response = await fetch(`${DJANGO_API_URL}/students/?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers if needed
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || 'Failed to fetch students' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Transform Django response to match Next.js expected format
    return NextResponse.json({
      students: data.results || data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(pageSize),
        total: data.count || data.length,
        pages: data.count ? Math.ceil(data.count / parseInt(pageSize)) : 1
      }
    });

  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
