from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.utils import timezone
from datetime import date
import uuid

User = get_user_model()


class Student(models.Model):
    """
    Comprehensive Student model for school management system
    """
    
    # Status choices
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('graduated', 'Graduated'),
        ('transferred', 'Transferred'),
        ('suspended', 'Suspended'),
        ('expelled', 'Expelled'),
    ]
    
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    
    BLOOD_GROUP_CHOICES = [
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    ]
    
    # Primary Information
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student_id = models.CharField(max_length=20, unique=True, help_text="Unique student identification number")
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile', null=True, blank=True)
    
    # Personal Information
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES, blank=True, null=True)
    nationality = models.CharField(max_length=50, default='British')
    religion = models.CharField(max_length=50, blank=True, null=True)
    
    # Contact Information
    email = models.EmailField(unique=True, null=True, blank=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True, null=True)
    emergency_contact_name = models.CharField(max_length=100)
    emergency_contact_phone = models.CharField(validators=[phone_regex], max_length=17)
    emergency_contact_relationship = models.CharField(max_length=50)
    
    # Address Information
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    county = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=10)
    country = models.CharField(max_length=50, default='United Kingdom')
    
    # Academic Information
    admission_date = models.DateField(default=timezone.now)
    current_class = models.CharField(max_length=20, help_text="Current class/grade")
    academic_year = models.CharField(max_length=9, help_text="e.g., 2023-2024")
    roll_number = models.CharField(max_length=20, blank=True, null=True)
    section = models.CharField(max_length=10, blank=True, null=True)
    
    # Status and Tracking
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    enrollment_status = models.BooleanField(default=True)
    graduation_date = models.DateField(null=True, blank=True)
    
    # Parent/Guardian Information
    father_name = models.CharField(max_length=100, blank=True, null=True)
    father_phone = models.CharField(validators=[phone_regex], max_length=17, blank=True, null=True)
    father_email = models.EmailField(blank=True, null=True)
    father_occupation = models.CharField(max_length=100, blank=True, null=True)
    
    mother_name = models.CharField(max_length=100, blank=True, null=True)
    mother_phone = models.CharField(validators=[phone_regex], max_length=17, blank=True, null=True)
    mother_email = models.EmailField(blank=True, null=True)
    mother_occupation = models.CharField(max_length=100, blank=True, null=True)
    
    guardian_name = models.CharField(max_length=100, blank=True, null=True)
    guardian_phone = models.CharField(validators=[phone_regex], max_length=17, blank=True, null=True)
    guardian_email = models.EmailField(blank=True, null=True)
    guardian_relationship = models.CharField(max_length=50, blank=True, null=True)
    
    # Medical Information
    medical_conditions = models.TextField(blank=True, null=True, help_text="Any medical conditions or allergies")
    medications = models.TextField(blank=True, null=True, help_text="Current medications")
    doctor_name = models.CharField(max_length=100, blank=True, null=True)
    doctor_phone = models.CharField(validators=[phone_regex], max_length=17, blank=True, null=True)
    
    # Additional Information
    profile_picture = models.ImageField(upload_to='students/profiles/', blank=True, null=True)
    notes = models.TextField(blank=True, null=True, help_text="Additional notes about the student")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_students')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='updated_students')
    
    class Meta:
        ordering = ['first_name', 'last_name']
        verbose_name = 'Student'
        verbose_name_plural = 'Students'
        indexes = [
            models.Index(fields=['student_id']),
            models.Index(fields=['status']),
            models.Index(fields=['current_class']),
            models.Index(fields=['admission_date']),
        ]
    
    def __str__(self):
        return f"{self.student_id} - {self.get_full_name()}"
    
    def get_full_name(self):
        """Return the full name of the student"""
        if self.middle_name:
            return f"{self.first_name} {self.middle_name} {self.last_name}"
        return f"{self.first_name} {self.last_name}"
    
    def get_age(self):
        """Calculate and return the student's age"""
        today = date.today()
        return today.year - self.date_of_birth.year - ((today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day))
    
    def is_active(self):
        """Check if student is currently active"""
        return self.status == 'active' and self.enrollment_status
    
    def get_primary_contact(self):
        """Get primary emergency contact information"""
        return {
            'name': self.emergency_contact_name,
            'phone': self.emergency_contact_phone,
            'relationship': self.emergency_contact_relationship
        }
    
    def get_address(self):
        """Get formatted address"""
        address_parts = [self.address_line_1]
        if self.address_line_2:
            address_parts.append(self.address_line_2)
        address_parts.extend([self.city, self.county, self.postal_code, self.country])
        return ', '.join(address_parts)
    
    def save(self, *args, **kwargs):
        # Auto-generate student ID if not provided
        if not self.student_id:
            year = timezone.now().year
            last_student = Student.objects.filter(
                student_id__startswith=f"STU{year}"
            ).order_by('student_id').last()
            
            if last_student:
                last_number = int(last_student.student_id[-4:])
                new_number = last_number + 1
            else:
                new_number = 1
            
            self.student_id = f"STU{year}{new_number:04d}"
        
        super().save(*args, **kwargs)


class StudentDocument(models.Model):
    """
    Model to store student documents (certificates, reports, etc.)
    """
    DOCUMENT_TYPES = [
        ('birth_certificate', 'Birth Certificate'),
        ('previous_school_report', 'Previous School Report'),
        ('medical_report', 'Medical Report'),
        ('passport', 'Passport'),
        ('visa', 'Visa'),
        ('other', 'Other'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='documents')
    document_type = models.CharField(max_length=50, choices=DOCUMENT_TYPES)
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to='students/documents/')
    description = models.TextField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    class Meta:
        ordering = ['-uploaded_at']
        verbose_name = 'Student Document'
        verbose_name_plural = 'Student Documents'
    
    def __str__(self):
        return f"{self.student.get_full_name()} - {self.title}"


class StudentNote(models.Model):
    """
    Model to store notes about students (behavioral, academic, etc.)
    """
    NOTE_TYPES = [
        ('academic', 'Academic'),
        ('behavioral', 'Behavioral'),
        ('medical', 'Medical'),
        ('general', 'General'),
        ('disciplinary', 'Disciplinary'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='student_notes')
    note_type = models.CharField(max_length=20, choices=NOTE_TYPES)
    title = models.CharField(max_length=200)
    content = models.TextField()
    is_confidential = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Student Note'
        verbose_name_plural = 'Student Notes'
    
    def __str__(self):
        return f"{self.student.get_full_name()} - {self.title}"
