from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Authentication
    path('register/', views.RegisterView.as_view(), name='register'),
    path('verify-email/<str:uidb64>/<str:token>/', views.VerifyEmailView.as_view(), name='verify-email'),
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Password management
    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),
    path('reset-password/request/', views.ResetPasswordEmailView.as_view(), name='request-reset-password'),
    path('reset-password/confirm/', views.ResetPasswordView.as_view(), name='reset-password'),
    
    # User profile and management
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('me/', views.UserDetailView.as_view(), name='user-detail'),
    
    # Admin only
    path('users/', views.UserListView.as_view(), name='user-list'),
]
