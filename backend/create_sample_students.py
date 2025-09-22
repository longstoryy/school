#!/usr/bin/env python
"""
Script to create sample student data for testing
"""

import os
import sys
import django
from datetime import date, timedelta
from django.utils import timezone

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from students.models import Student
from django.contrib.auth import get_user_model

User = get_user_model()

def create_sample_students():
    """Create sample students for testing"""
    
    # Sample student data
    students_data = [
        {
            'first_name': 'Emma',
            'last_name': 'Johnson',
            'date_of_birth': date(2010, 3, 15),
            'gender': 'F',
            'email': 'emma.johnson@student.school.com',
            'phone_number': '+447123456789',
            'current_class': 'Year 8',
            'section': 'A',
            'status': 'active',
            'emergency_contact_name': 'Sarah Johnson',
            'emergency_contact_phone': '+447987654321',
            'emergency_contact_relationship': 'Mother',
            'address_line_1': '123 Oak Street',
            'city': 'London',
            'county': 'Greater London',
            'postal_code': 'SW1A 1AA',
            'father_name': 'David Johnson',
            'mother_name': 'Sarah Johnson',
            'blood_group': 'A+',
        },
        {
            'first_name': 'James',
            'last_name': 'Smith',
            'date_of_birth': date(2009, 7, 22),
            'gender': 'M',
            'email': 'james.smith@student.school.com',
            'phone_number': '+447234567890',
            'current_class': 'Year 9',
            'section': 'B',
            'status': 'active',
            'emergency_contact_name': 'Michael Smith',
            'emergency_contact_phone': '+447876543210',
            'emergency_contact_relationship': 'Father',
            'address_line_1': '456 Elm Avenue',
            'city': 'Manchester',
            'county': 'Greater Manchester',
            'postal_code': 'M1 1AA',
            'father_name': 'Michael Smith',
            'mother_name': 'Lisa Smith',
            'blood_group': 'B+',
        },
        {
            'first_name': 'Olivia',
            'last_name': 'Brown',
            'date_of_birth': date(2011, 11, 8),
            'gender': 'F',
            'email': 'olivia.brown@student.school.com',
            'phone_number': '+447345678901',
            'current_class': 'Year 7',
            'section': 'A',
            'status': 'active',
            'emergency_contact_name': 'Jennifer Brown',
            'emergency_contact_phone': '+447765432109',
            'emergency_contact_relationship': 'Mother',
            'address_line_1': '789 Pine Road',
            'city': 'Birmingham',
            'county': 'West Midlands',
            'postal_code': 'B1 1AA',
            'father_name': 'Robert Brown',
            'mother_name': 'Jennifer Brown',
            'blood_group': 'O+',
        },
        {
            'first_name': 'William',
            'last_name': 'Davis',
            'date_of_birth': date(2008, 5, 3),
            'gender': 'M',
            'email': 'william.davis@student.school.com',
            'phone_number': '+447456789012',
            'current_class': 'Year 10',
            'section': 'C',
            'status': 'active',
            'emergency_contact_name': 'Patricia Davis',
            'emergency_contact_phone': '+447654321098',
            'emergency_contact_relationship': 'Mother',
            'address_line_1': '321 Maple Lane',
            'city': 'Leeds',
            'county': 'West Yorkshire',
            'postal_code': 'LS1 1AA',
            'father_name': 'Charles Davis',
            'mother_name': 'Patricia Davis',
            'blood_group': 'AB+',
        },
        {
            'first_name': 'Sophia',
            'last_name': 'Wilson',
            'date_of_birth': date(2012, 1, 17),
            'gender': 'F',
            'email': 'sophia.wilson@student.school.com',
            'phone_number': '+447567890123',
            'current_class': 'Year 6',
            'section': 'B',
            'status': 'active',
            'emergency_contact_name': 'Amanda Wilson',
            'emergency_contact_phone': '+447543210987',
            'emergency_contact_relationship': 'Mother',
            'address_line_1': '654 Cedar Court',
            'city': 'Liverpool',
            'county': 'Merseyside',
            'postal_code': 'L1 1AA',
            'father_name': 'Thomas Wilson',
            'mother_name': 'Amanda Wilson',
            'blood_group': 'A-',
        },
        {
            'first_name': 'Alexander',
            'last_name': 'Miller',
            'date_of_birth': date(2007, 9, 12),
            'gender': 'M',
            'email': 'alexander.miller@student.school.com',
            'phone_number': '+447678901234',
            'current_class': 'Year 11',
            'section': 'A',
            'status': 'active',
            'emergency_contact_name': 'Helen Miller',
            'emergency_contact_phone': '+447432109876',
            'emergency_contact_relationship': 'Mother',
            'address_line_1': '987 Birch Street',
            'city': 'Sheffield',
            'county': 'South Yorkshire',
            'postal_code': 'S1 1AA',
            'father_name': 'Andrew Miller',
            'mother_name': 'Helen Miller',
            'blood_group': 'B-',
        },
        {
            'first_name': 'Isabella',
            'last_name': 'Taylor',
            'date_of_birth': date(2006, 12, 25),
            'gender': 'F',
            'email': 'isabella.taylor@student.school.com',
            'phone_number': '+447789012345',
            'current_class': 'Year 12',
            'section': 'A',
            'status': 'graduated',
            'emergency_contact_name': 'Rachel Taylor',
            'emergency_contact_phone': '+447321098765',
            'emergency_contact_relationship': 'Mother',
            'address_line_1': '147 Willow Drive',
            'city': 'Bristol',
            'county': 'Bristol',
            'postal_code': 'BS1 1AA',
            'father_name': 'Mark Taylor',
            'mother_name': 'Rachel Taylor',
            'blood_group': 'O-',
            'graduation_date': date(2024, 6, 15),
        },
        {
            'first_name': 'Benjamin',
            'last_name': 'Anderson',
            'date_of_birth': date(2013, 4, 9),
            'gender': 'M',
            'email': 'benjamin.anderson@student.school.com',
            'phone_number': '+447890123456',
            'current_class': 'Year 5',
            'section': 'C',
            'status': 'inactive',
            'emergency_contact_name': 'Karen Anderson',
            'emergency_contact_phone': '+447210987654',
            'emergency_contact_relationship': 'Mother',
            'address_line_1': '258 Spruce Avenue',
            'city': 'Newcastle',
            'county': 'Tyne and Wear',
            'postal_code': 'NE1 1AA',
            'father_name': 'Steven Anderson',
            'mother_name': 'Karen Anderson',
            'blood_group': 'AB-',
            'enrollment_status': False,
        }
    ]
    
    created_count = 0
    for student_data in students_data:
        # Check if student already exists
        if not Student.objects.filter(email=student_data['email']).exists():
            student = Student.objects.create(**student_data)
            print(f"Created student: {student.get_full_name()} ({student.student_id})")
            created_count += 1
        else:
            print(f"Student with email {student_data['email']} already exists, skipping...")
    
    print(f"\n✅ Successfully created {created_count} sample students!")
    print(f"📊 Total students in database: {Student.objects.count()}")
    
    # Print some statistics
    print("\n📈 Student Statistics:")
    print(f"  - Active students: {Student.objects.filter(status='active').count()}")
    print(f"  - Inactive students: {Student.objects.filter(status='inactive').count()}")
    print(f"  - Graduated students: {Student.objects.filter(status='graduated').count()}")
    
    print("\n🎓 Students by Class:")
    from django.db.models import Count
    class_stats = Student.objects.values('current_class').annotate(count=Count('id')).order_by('current_class')
    for stat in class_stats:
        print(f"  - {stat['current_class']}: {stat['count']} students")


if __name__ == '__main__':
    print("🚀 Creating sample student data...")
    create_sample_students()
    print("\n✨ Sample data creation completed!")
