// Comprehensive Student interface matching Django backend
export interface Student {
  // Core identification
  id: string;
  student_id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  
  // Contact information
  email: string;
  phone_number: string;
  phone_country_code?: string;
  
  // Personal details
  date_of_birth?: string;
  age: number;
  gender?: string;
  address?: string;
  
  // Academic information
  current_class: string;
  section: string;
  academic_year?: string;
  admission_date: string;
  admission_number?: string;
  previous_school?: string;
  
  // Parent/Guardian information
  parent_name?: string;
  parent_phone?: string;
  parent_email?: string;
  guardian_type?: string;
  father_name?: string;
  mother_name?: string;
  guardian_name?: string;
  emergency_contact?: string;
  
  // Additional information
  medical_info?: string;
  notes?: string;
  
  // Status and metadata
  status: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Pre-cached students data for instant loading
export const CACHED_STUDENTS: Student[] = [
  {
    id: '1',
    student_id: 'STU001',
    full_name: 'Emma Johnson',
    first_name: 'Emma',
    last_name: 'Johnson',
    email: 'emma.johnson@student.school.com',
    phone_number: '+447123456789',
    current_class: 'Year 8',
    section: 'A',
    status: 'active',
    admission_date: '2023-09-01',
    age: 13,
    is_active: true
  },
  {
    id: '2',
    student_id: 'STU002',
    full_name: 'James Smith',
    first_name: 'James',
    last_name: 'Smith',
    email: 'james.smith@student.school.com',
    phone_number: '+447234567890',
    current_class: 'Year 9',
    section: 'B',
    status: 'active',
    admission_date: '2022-09-01',
    age: 14,
    is_active: true
  },
  {
    id: '3',
    student_id: 'STU003',
    full_name: 'Olivia Brown',
    first_name: 'Olivia',
    last_name: 'Brown',
    email: 'olivia.brown@student.school.com',
    phone_number: '+447345678901',
    current_class: 'Year 7',
    section: 'A',
    status: 'active',
    admission_date: '2024-09-01',
    age: 12,
    is_active: true
  },
  {
    id: '4',
    student_id: 'STU004',
    full_name: 'William Davis',
    first_name: 'William',
    last_name: 'Davis',
    email: 'william.davis@student.school.com',
    phone_number: '+447456789012',
    current_class: 'Year 10',
    section: 'A',
    status: 'active',
    admission_date: '2021-09-01',
    age: 15,
    is_active: true
  },
  {
    id: '5',
    student_id: 'STU005',
    full_name: 'Sophia Wilson',
    first_name: 'Sophia',
    last_name: 'Wilson',
    email: 'sophia.wilson@student.school.com',
    phone_number: '+447567890123',
    current_class: 'Year 11',
    section: 'B',
    status: 'active',
    admission_date: '2020-09-01',
    age: 16,
    is_active: true
  },
  {
    id: '6',
    student_id: 'STU006',
    full_name: 'Benjamin Miller',
    first_name: 'Benjamin',
    last_name: 'Miller',
    email: 'benjamin.miller@student.school.com',
    phone_number: '+447678901234',
    current_class: 'Year 12',
    section: 'A',
    status: 'active',
    admission_date: '2019-09-01',
    age: 17,
    is_active: true
  },
  {
    id: '7',
    student_id: 'STU007',
    full_name: 'Charlotte Taylor',
    first_name: 'Charlotte',
    last_name: 'Taylor',
    email: 'charlotte.taylor@student.school.com',
    phone_number: '+447789012345',
    current_class: 'Year 8',
    section: 'B',
    status: 'active',
    admission_date: '2023-09-01',
    age: 13,
    is_active: true
  },
  {
    id: '8',
    student_id: 'STU008',
    full_name: 'Alexander Anderson',
    first_name: 'Alexander',
    last_name: 'Anderson',
    email: 'alexander.anderson@student.school.com',
    phone_number: '+447890123456',
    current_class: 'Year 9',
    section: 'A',
    status: 'active',
    admission_date: '2022-09-01',
    age: 14,
    is_active: true
  }
];

// Fast search function
export const searchStudents = (students: Student[], query: string): Student[] => {
  if (!query.trim()) return students;
  
  const searchTerm = query.toLowerCase();
  return students.filter(student => 
    student.full_name.toLowerCase().includes(searchTerm) ||
    student.student_id.toLowerCase().includes(searchTerm) ||
    student.email.toLowerCase().includes(searchTerm) ||
    student.current_class.toLowerCase().includes(searchTerm)
  );
};

// Filter by status
export const filterStudentsByStatus = (students: Student[], status: string): Student[] => {
  if (status === 'all') return students;
  return students.filter(student => student.status === status);
};
