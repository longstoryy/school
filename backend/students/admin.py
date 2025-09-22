from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Student, StudentDocument, StudentNote


class StudentDocumentInline(admin.TabularInline):
    model = StudentDocument
    extra = 0
    readonly_fields = ['uploaded_at', 'uploaded_by']
    fields = ['document_type', 'title', 'file', 'description', 'uploaded_at', 'uploaded_by']


class StudentNoteInline(admin.TabularInline):
    model = StudentNote
    extra = 0
    readonly_fields = ['created_at', 'created_by']
    fields = ['note_type', 'title', 'content', 'is_confidential', 'created_at', 'created_by']


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = [
        'student_id', 'get_full_name', 'current_class', 'section', 
        'status', 'enrollment_status', 'admission_date', 'get_age',
        'get_profile_picture', 'created_at'
    ]
    list_filter = [
        'status', 'enrollment_status', 'current_class', 'section', 
        'gender', 'admission_date', 'created_at'
    ]
    search_fields = [
        'student_id', 'first_name', 'last_name', 'middle_name', 
        'email', 'phone_number', 'father_name', 'mother_name'
    ]
    readonly_fields = [
        'id', 'get_full_name', 'get_age', 'get_profile_picture',
        'created_at', 'updated_at', 'created_by', 'updated_by'
    ]
    
    fieldsets = (
        ('Basic Information', {
            'fields': (
                'student_id', 'get_full_name', 'first_name', 'last_name', 'middle_name',
                'date_of_birth', 'get_age', 'gender', 'blood_group', 'nationality', 'religion'
            )
        }),
        ('Contact Information', {
            'fields': (
                'email', 'phone_number', 'emergency_contact_name', 
                'emergency_contact_phone', 'emergency_contact_relationship'
            )
        }),
        ('Address', {
            'fields': (
                'address_line_1', 'address_line_2', 'city', 'county', 
                'postal_code', 'country'
            )
        }),
        ('Academic Information', {
            'fields': (
                'admission_date', 'current_class', 'academic_year', 
                'roll_number', 'section', 'status', 'enrollment_status', 'graduation_date'
            )
        }),
        ('Parent/Guardian Information', {
            'fields': (
                'father_name', 'father_phone', 'father_email', 'father_occupation',
                'mother_name', 'mother_phone', 'mother_email', 'mother_occupation',
                'guardian_name', 'guardian_phone', 'guardian_email', 'guardian_relationship'
            ),
            'classes': ['collapse']
        }),
        ('Medical Information', {
            'fields': (
                'medical_conditions', 'medications', 'doctor_name', 'doctor_phone'
            ),
            'classes': ['collapse']
        }),
        ('Additional Information', {
            'fields': (
                'get_profile_picture', 'profile_picture', 'notes'
            ),
            'classes': ['collapse']
        }),
        ('System Information', {
            'fields': (
                'id', 'created_at', 'updated_at', 'created_by', 'updated_by'
            ),
            'classes': ['collapse']
        }),
    )
    
    inlines = [StudentDocumentInline, StudentNoteInline]
    
    actions = ['mark_as_active', 'mark_as_inactive', 'mark_as_graduated']
    
    def get_full_name(self, obj):
        return obj.get_full_name()
    get_full_name.short_description = 'Full Name'
    get_full_name.admin_order_field = 'first_name'
    
    def get_age(self, obj):
        return f"{obj.get_age()} years"
    get_age.short_description = 'Age'
    
    def get_profile_picture(self, obj):
        if obj.profile_picture:
            return format_html(
                '<img src="{}" width="50" height="50" style="border-radius: 50%;" />',
                obj.profile_picture.url
            )
        return "No Image"
    get_profile_picture.short_description = 'Profile Picture'
    
    def mark_as_active(self, request, queryset):
        updated = queryset.update(status='active', enrollment_status=True)
        self.message_user(request, f'{updated} students marked as active.')
    mark_as_active.short_description = "Mark selected students as active"
    
    def mark_as_inactive(self, request, queryset):
        updated = queryset.update(status='inactive', enrollment_status=False)
        self.message_user(request, f'{updated} students marked as inactive.')
    mark_as_inactive.short_description = "Mark selected students as inactive"
    
    def mark_as_graduated(self, request, queryset):
        from django.utils import timezone
        updated = queryset.update(status='graduated', graduation_date=timezone.now().date())
        self.message_user(request, f'{updated} students marked as graduated.')
    mark_as_graduated.short_description = "Mark selected students as graduated"
    
    def save_model(self, request, obj, form, change):
        if not change:  # Creating new student
            obj.created_by = request.user
        obj.updated_by = request.user
        super().save_model(request, obj, form, change)


@admin.register(StudentDocument)
class StudentDocumentAdmin(admin.ModelAdmin):
    list_display = [
        'student', 'document_type', 'title', 'uploaded_at', 'uploaded_by'
    ]
    list_filter = ['document_type', 'uploaded_at']
    search_fields = ['student__first_name', 'student__last_name', 'student__student_id', 'title']
    readonly_fields = ['uploaded_at', 'uploaded_by']
    
    def save_model(self, request, obj, form, change):
        if not change:
            obj.uploaded_by = request.user
        super().save_model(request, obj, form, change)


@admin.register(StudentNote)
class StudentNoteAdmin(admin.ModelAdmin):
    list_display = [
        'student', 'note_type', 'title', 'is_confidential', 'created_at', 'created_by'
    ]
    list_filter = ['note_type', 'is_confidential', 'created_at']
    search_fields = ['student__first_name', 'student__last_name', 'student__student_id', 'title', 'content']
    readonly_fields = ['created_at', 'created_by']
    
    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        super().save_model(request, obj, form, change)
