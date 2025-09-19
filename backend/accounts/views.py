from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings

from .models import Profile, EmailVerificationToken
from .serializers import (
    UserSerializer, UserCreateSerializer, UserUpdateSerializer,
    ChangePasswordSerializer, ResetPasswordEmailSerializer,
    ResetPasswordSerializer, ProfileSerializer, CustomTokenObtainPairSerializer
)

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    """View for user registration"""
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]
    
    def perform_create(self, serializer):
        user = serializer.save()
        # Create a profile for the user
        Profile.objects.create(user=user)
        # Send verification email
        self.send_verification_email(user)
    
    def send_verification_email(self, user):
        """Send verification email to the user"""
        token = default_token_generator.make_token(user)
        EmailVerificationToken.objects.update_or_create(
            user=user,
            defaults={'token': token}
        )
        
        verification_url = f"{settings.FRONTEND_URL}/verify-email/{user.id}/{token}/"
        subject = 'Verify your email address'
        message = f'Please click the following link to verify your email: {verification_url}'
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])

class VerifyEmailView(APIView):
    """View for email verification"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, uidb64, token):
        try:
            user = User.objects.get(pk=uidb64)
            if default_token_generator.check_token(user, token):
                user.is_verified = True
                user.is_active = True
                user.save()
                return Response({'message': 'Email successfully verified'}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'error': 'Invalid user'}, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom token obtain view to use our custom serializer"""
    serializer_class = CustomTokenObtainPairSerializer

class ChangePasswordView(generics.UpdateAPIView):
    """View for changing password"""
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # Set new password
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordEmailView(APIView):
    """View for requesting a password reset email"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = ResetPasswordEmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                token = default_token_generator.make_token(user)
                reset_url = f"{settings.FRONTEND_URL}/reset-password/{user.id}/{token}/"
                
                subject = 'Password Reset Requested'
                message = f'Click the following link to reset your password: {reset_url}'
                send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])
                
                return Response({"message": "Password reset email sent"}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error": "User with this email does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    """View for resetting password"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(pk=serializer.validated_data['uidb64'])
                if default_token_generator.check_token(user, serializer.validated_data['token']):
                    user.set_password(serializer.validated_data['password'])
                    user.save()
                    return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
            except (TypeError, ValueError, OverflowError, User.DoesNotExist):
                return Response({"error": "Invalid user"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(generics.RetrieveUpdateAPIView):
    """View for user profile"""
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        # Get or create profile if it doesn't exist
        profile, created = Profile.objects.get_or_create(user=self.request.user)
        return profile
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

class UserDetailView(generics.RetrieveUpdateAPIView):
    """View for user details"""
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class UserListView(generics.ListAPIView):
    """View for listing users"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
