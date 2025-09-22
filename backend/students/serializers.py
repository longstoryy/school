from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Student, StudentDocument, StudentNote

User = get_user_model()


class StudentDocumentSerializer(serializers.ModelSerializer):
    """Serializer for student documents"""
    uploaded_by_name = serializers.CharField(source='uploaded_by.get_full_name', read_only=True)
    file_size = serializers.SerializerMethodField()
    
    class Meta:
        model = StudentDocument
        fields = [
            'id', 'document_type', 'title', 'file', 'description',
            'uploaded_at', 'uploaded_by', 'uploaded_by_name', 'file_size'
        ]
        read_only_fields = ['uploaded_at', 'uploaded_by']
    
    def get_file_size(self, obj):
        """Get file size in human readable format"""
        if obj.file:
            size = obj.file.size
            for unit in ['B', 'KB', 'MB', 'GB']:
                if size < 1024.0:
                    return f"{size:.1f} {unit}"
                size /= 1024.0
            return f"{size:.1f} TB"
        return None


class StudentNoteSerializer(serializers.ModelSerializer):
    """Serializer for student notes"""
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    
    class Meta:
        model = StudentNote
        fields = [
            'id', 'note_type', 'title', 'content', 'is_confidential',
            'created_at', 'created_by', 'created_by_name'
        ]
        read_only_fields = ['created_at', 'created_by']


class StudentListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for student lists"""
    full_name = serializers.CharField(source='get_full_name', read_only=True)
    age = serializers.IntegerField(source='get_age', read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Student
        fields = [
            'id', 'student_id', 'full_name', 'first_name', 'last_name',
            'email', 'phone_number', 'current_class', 'section',
            'status', 'admission_date', 'age', 'is_active', 'profile_picture'
        ]


class StudentDetailSerializer(serializers.ModelSerializer):
    """Comprehensive serializer for student details"""
    full_name = serializers.CharField(source='get_full_name', read_only=True)
    age = serializers.IntegerField(source='get_age', read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    primary_contact = serializers.DictField(source='get_primary_contact', read_only=True)
    formatted_address = serializers.CharField(source='get_address', read_only=True)
    
    # Related data
    documents = StudentDocumentSerializer(many=True, read_only=True)
    student_notes = StudentNoteSerializer(many=True, read_only=True)
    
    # User information
    user_email = serializers.CharField(source='user.email', read_only=True)
    user_is_active = serializers.BooleanField(source='user.is_active', read_only=True)
    
    # Audit fields
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    updated_by_name = serializers.CharField(source='updated_by.get_full_name', read_only=True)
    
    class Meta:
        model = Student
        fields = '__all__'
        read_only_fields = [
            'id', 'created_at', 'updated_at', 'created_by', 'updated_by',
            'full_name', 'age', 'is_active', 'primary_contact', 'formatted_address'
        ]
    
    def validate_email(self, value):
        """Validate email uniqueness"""
        if value:
            student_id = self.instance.id if self.instance else None
            if Student.objects.filter(email=value).exclude(id=student_id).exists():
                raise serializers.ValidationError("A student with this email already exists.")
        return value
    
    def validate_student_id(self, value):
        """Validate student ID uniqueness"""
        student_id = self.instance.id if self.instance else None
        if Student.objects.filter(student_id=value).exclude(id=student_id).exists():
            raise serializers.ValidationError("A student with this ID already exists.")
        return value
    
    def validate_date_of_birth(self, value):
        """Validate date of birth"""
        from datetime import date
        if value > date.today():
            raise serializers.ValidationError("Date of birth cannot be in the future.")
        
        # Check if student is too young (less than 3 years old)
        age = date.today().year - value.year
        if age < 3:
            raise serializers.ValidationError("Student must be at least 3 years old.")
        
        return value


class StudentCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new students"""
    
    class Meta:
        model = Student
        fields = [
            'student_id', 'first_name', 'last_name', 'middle_name',
            'date_of_birth', 'gender', 'blood_group', 'nationality', 'religion',
            'email', 'phone_number', 'emergency_contact_name', 'emergency_contact_phone',
            'emergency_contact_relationship', 'address_line_1', 'address_line_2',
            'city', 'county', 'postal_code', 'country', 'admission_date',
            'current_class', 'academic_year', 'roll_number', 'section',
            'father_name', 'father_phone', 'father_email', 'father_occupation',
            'mother_name', 'mother_phone', 'mother_email', 'mother_occupation',
            'guardian_name', 'guardian_phone', 'guardian_email', 'guardian_relationship',
            'medical_conditions', 'medications', 'doctor_name', 'doctor_phone',
            'profile_picture', 'notes'
        ]
    
    def validate_email(self, value):
        """Validate email uniqueness"""
        if value and Student.objects.filter(email=value).exists():
            raise serializers.ValidationError("A student with this email already exists.")
        return value
    
    def validate_student_id(self, value):
        """Validate student ID uniqueness if provided"""
        if value and Student.objects.filter(student_id=value).exists():
            raise serializers.ValidationError("A student with this ID already exists.")
        return value


class StudentUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating students"""
    
    class Meta:
        model = Student
        fields = [
            'first_name', 'last_name', 'middle_name', 'date_of_birth',
            'gender', 'blood_group', 'nationality', 'religion', 'email',
            'phone_number', 'emergency_contact_name', 'emergency_contact_phone',
            'emergency_contact_relationship', 'address_line_1', 'address_line_2',
            'city', 'county', 'postal_code', 'country', 'current_class',
            'academic_year', 'roll_number', 'section', 'status', 'enrollment_status',
            'graduation_date', 'father_name', 'father_phone', 'father_email',
            'father_occupation', 'mother_name', 'mother_phone', 'mother_email',
            'mother_occupation', 'guardian_name', 'guardian_phone', 'guardian_email',
            'guardian_relationship', 'medical_conditions', 'medications',
            'doctor_name', 'doctor_phone', 'profile_picture', 'notes'
        ]
    
    def validate_email(self, value):
        """Validate email uniqueness"""
        if value:
            student_id = self.instance.id if self.instance else None
            if Student.objects.filter(email=value).exclude(id=student_id).exists():
                raise serializers.ValidationError("A student with this email already exists.")
        return value


class StudentStatsSerializer(serializers.Serializer):
    """Serializer for student statistics"""
    total_students = serializers.IntegerField()
    active_students = serializers.IntegerField()
    inactive_students = serializers.IntegerField()
    graduated_students = serializers.IntegerField()
    new_admissions_this_month = serializers.IntegerField()
    students_by_class = serializers.DictField()
    students_by_status = serializers.DictField()
    gender_distribution = serializers.DictField()
    age_distribution = serializers.DictField()


class StudentSearchSerializer(serializers.Serializer):
    """Serializer for student search parameters"""
    query = serializers.CharField(required=False, allow_blank=True)
    status = serializers.ChoiceField(choices=Student.STATUS_CHOICES, required=False)
    current_class = serializers.CharField(required=False, allow_blank=True)
    section = serializers.CharField(required=False, allow_blank=True)
    gender = serializers.ChoiceField(choices=Student.GENDER_CHOICES, required=False)
    admission_date_from = serializers.DateField(required=False)
    admission_date_to = serializers.DateField(required=False)
    age_from = serializers.IntegerField(required=False, min_value=0)
    age_to = serializers.IntegerField(required=False, min_value=0)
    ordering = serializers.CharField(required=False, default='first_name')
