from rest_framework import generics, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Count
from django.utils import timezone
from datetime import datetime, timedelta
from .models import Student, StudentDocument, StudentNote
from .serializers import (
    StudentListSerializer, StudentDetailSerializer, StudentCreateSerializer,
    StudentUpdateSerializer, StudentStatsSerializer, StudentSearchSerializer,
    StudentDocumentSerializer, StudentNoteSerializer
)


class StudentPagination(PageNumberPagination):
    """Custom pagination for students"""
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class StudentListCreateView(generics.ListCreateAPIView):
    """
    List all students or create a new student
    """
    queryset = Student.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = StudentPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'current_class', 'section', 'gender', 'enrollment_status']
    search_fields = ['first_name', 'last_name', 'student_id', 'email', 'phone_number']
    ordering_fields = ['first_name', 'last_name', 'student_id', 'admission_date', 'created_at']
    ordering = ['first_name', 'last_name']
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return StudentCreateSerializer
        return StudentListSerializer
    
    def perform_create(self, serializer):
        # Handle anonymous users when authentication is disabled
        if self.request.user.is_authenticated:
            serializer.save(created_by=self.request.user)
        else:
            serializer.save()


class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a student
    """
    queryset = Student.objects.all()
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return StudentUpdateSerializer
        return StudentDetailSerializer
    
    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_stats(request):
    """
    Get comprehensive student statistics
    """
    # Basic counts
    total_students = Student.objects.count()
    active_students = Student.objects.filter(status='active', enrollment_status=True).count()
    inactive_students = Student.objects.filter(status='inactive').count()
    graduated_students = Student.objects.filter(status='graduated').count()
    
    # New admissions this month
    current_month = timezone.now().replace(day=1)
    new_admissions_this_month = Student.objects.filter(
        admission_date__gte=current_month
    ).count()
    
    # Students by class
    students_by_class = dict(
        Student.objects.values('current_class')
        .annotate(count=Count('id'))
        .values_list('current_class', 'count')
    )
    
    # Students by status
    students_by_status = dict(
        Student.objects.values('status')
        .annotate(count=Count('id'))
        .values_list('status', 'count')
    )
    
    # Gender distribution
    gender_distribution = dict(
        Student.objects.values('gender')
        .annotate(count=Count('id'))
        .values_list('gender', 'count')
    )
    
    # Age distribution
    from datetime import date
    current_date = date.today()
    age_ranges = {
        '3-5': 0, '6-8': 0, '9-11': 0, '12-14': 0, '15-17': 0, '18+': 0
    }
    
    for student in Student.objects.all():
        age = student.get_age()
        if 3 <= age <= 5:
            age_ranges['3-5'] += 1
        elif 6 <= age <= 8:
            age_ranges['6-8'] += 1
        elif 9 <= age <= 11:
            age_ranges['9-11'] += 1
        elif 12 <= age <= 14:
            age_ranges['12-14'] += 1
        elif 15 <= age <= 17:
            age_ranges['15-17'] += 1
        else:
            age_ranges['18+'] += 1
    
    stats_data = {
        'total_students': total_students,
        'active_students': active_students,
        'inactive_students': inactive_students,
        'graduated_students': graduated_students,
        'new_admissions_this_month': new_admissions_this_month,
        'students_by_class': students_by_class,
        'students_by_status': students_by_status,
        'gender_distribution': gender_distribution,
        'age_distribution': age_ranges,
    }
    
    serializer = StudentStatsSerializer(stats_data)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def student_search(request):
    """
    Advanced student search with multiple filters
    """
    serializer = StudentSearchSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    queryset = Student.objects.all()
    
    # Text search
    if data.get('query'):
        query = data['query']
        queryset = queryset.filter(
            Q(first_name__icontains=query) |
            Q(last_name__icontains=query) |
            Q(middle_name__icontains=query) |
            Q(student_id__icontains=query) |
            Q(email__icontains=query) |
            Q(phone_number__icontains=query)
        )
    
    # Status filter
    if data.get('status'):
        queryset = queryset.filter(status=data['status'])
    
    # Class filter
    if data.get('current_class'):
        queryset = queryset.filter(current_class__icontains=data['current_class'])
    
    # Section filter
    if data.get('section'):
        queryset = queryset.filter(section__icontains=data['section'])
    
    # Gender filter
    if data.get('gender'):
        queryset = queryset.filter(gender=data['gender'])
    
    # Date range filter
    if data.get('admission_date_from'):
        queryset = queryset.filter(admission_date__gte=data['admission_date_from'])
    
    if data.get('admission_date_to'):
        queryset = queryset.filter(admission_date__lte=data['admission_date_to'])
    
    # Age range filter (approximate)
    if data.get('age_from') or data.get('age_to'):
        from datetime import date
        current_year = date.today().year
        
        if data.get('age_from'):
            max_birth_year = current_year - data['age_from']
            queryset = queryset.filter(date_of_birth__year__lte=max_birth_year)
        
        if data.get('age_to'):
            min_birth_year = current_year - data['age_to']
            queryset = queryset.filter(date_of_birth__year__gte=min_birth_year)
    
    # Ordering
    ordering = data.get('ordering', 'first_name')
    if ordering.startswith('-'):
        queryset = queryset.order_by(ordering)
    else:
        queryset = queryset.order_by(ordering)
    
    # Paginate results
    paginator = StudentPagination()
    page = paginator.paginate_queryset(queryset, request)
    if page is not None:
        serializer = StudentListSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    serializer = StudentListSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def students_by_status(request, status_type):
    """
    Get students filtered by specific status
    """
    valid_statuses = dict(Student.STATUS_CHOICES).keys()
    if status_type not in valid_statuses:
        return Response(
            {'error': f'Invalid status. Valid options: {list(valid_statuses)}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    students = Student.objects.filter(status=status_type)
    paginator = StudentPagination()
    page = paginator.paginate_queryset(students, request)
    
    if page is not None:
        serializer = StudentListSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    serializer = StudentListSerializer(students, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def students_by_class(request, class_name):
    """
    Get students in a specific class
    """
    students = Student.objects.filter(current_class__iexact=class_name)
    paginator = StudentPagination()
    page = paginator.paginate_queryset(students, request)
    
    if page is not None:
        serializer = StudentListSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    serializer = StudentListSerializer(students, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bulk_update_status(request):
    """
    Bulk update student status
    """
    student_ids = request.data.get('student_ids', [])
    new_status = request.data.get('status')
    
    if not student_ids:
        return Response(
            {'error': 'student_ids is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if new_status not in dict(Student.STATUS_CHOICES).keys():
        return Response(
            {'error': 'Invalid status'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    updated_count = Student.objects.filter(
        id__in=student_ids
    ).update(
        status=new_status,
        updated_by=request.user,
        updated_at=timezone.now()
    )
    
    return Response({
        'message': f'Successfully updated {updated_count} students',
        'updated_count': updated_count
    })


# Student Documents Views
class StudentDocumentListCreateView(generics.ListCreateAPIView):
    """
    List or create student documents
    """
    serializer_class = StudentDocumentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        student_id = self.kwargs['student_id']
        return StudentDocument.objects.filter(student_id=student_id)
    
    def perform_create(self, serializer):
        student_id = self.kwargs['student_id']
        serializer.save(
            student_id=student_id,
            uploaded_by=self.request.user
        )


class StudentDocumentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a student document
    """
    serializer_class = StudentDocumentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        student_id = self.kwargs['student_id']
        return StudentDocument.objects.filter(student_id=student_id)


# Student Notes Views
class StudentNoteListCreateView(generics.ListCreateAPIView):
    """
    List or create student notes
    """
    serializer_class = StudentNoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        student_id = self.kwargs['student_id']
        return StudentNote.objects.filter(student_id=student_id)
    
    def perform_create(self, serializer):
        student_id = self.kwargs['student_id']
        serializer.save(
            student_id=student_id,
            created_by=self.request.user
        )


class StudentNoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a student note
    """
    serializer_class = StudentNoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        student_id = self.kwargs['student_id']
        return StudentNote.objects.filter(student_id=student_id)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recent_admissions(request):
    """
    Get recently admitted students (last 30 days)
    """
    thirty_days_ago = timezone.now() - timedelta(days=30)
    recent_students = Student.objects.filter(
        admission_date__gte=thirty_days_ago
    ).order_by('-admission_date')
    
    serializer = StudentListSerializer(recent_students, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_quick_info(request, student_id):
    """
    Get quick student information for popups/tooltips
    """
    try:
        student = Student.objects.get(student_id=student_id)
        data = {
            'id': student.id,
            'student_id': student.student_id,
            'full_name': student.get_full_name(),
            'current_class': student.current_class,
            'section': student.section,
            'status': student.status,
            'phone_number': student.phone_number,
            'email': student.email,
            'emergency_contact': student.get_primary_contact(),
            'profile_picture': student.profile_picture.url if student.profile_picture else None
        }
        return Response(data)
    except Student.DoesNotExist:
        return Response(
            {'error': 'Student not found'},
            status=status.HTTP_404_NOT_FOUND
        )
