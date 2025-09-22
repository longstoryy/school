from django.urls import path
from . import views

app_name = 'students'

urlpatterns = [
    # Main student endpoints
    path('', views.StudentListCreateView.as_view(), name='student-list-create'),
    path('<uuid:id>/', views.StudentDetailView.as_view(), name='student-detail'),
    
    # Student statistics and analytics
    path('stats/', views.student_stats, name='student-stats'),
    path('search/', views.student_search, name='student-search'),
    path('recent-admissions/', views.recent_admissions, name='recent-admissions'),
    
    # Students by filters
    path('status/<str:status_type>/', views.students_by_status, name='students-by-status'),
    path('class/<str:class_name>/', views.students_by_class, name='students-by-class'),
    
    # Bulk operations
    path('bulk/update-status/', views.bulk_update_status, name='bulk-update-status'),
    
    # Quick info
    path('quick-info/<str:student_id>/', views.student_quick_info, name='student-quick-info'),
    
    # Student documents
    path('<uuid:student_id>/documents/', views.StudentDocumentListCreateView.as_view(), name='student-documents'),
    path('<uuid:student_id>/documents/<int:pk>/', views.StudentDocumentDetailView.as_view(), name='student-document-detail'),
    
    # Student notes
    path('<uuid:student_id>/notes/', views.StudentNoteListCreateView.as_view(), name='student-notes'),
    path('<uuid:student_id>/notes/<int:pk>/', views.StudentNoteDetailView.as_view(), name='student-note-detail'),
]
