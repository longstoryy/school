from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Profile, EmailVerificationToken

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object"""
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'user_type', 'phone', 
                  'is_active', 'is_verified', 'date_joined', 'last_login')
        read_only_fields = ('id', 'is_active', 'is_verified', 'date_joined', 'last_login')

class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating a new user"""
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = User
        fields = ('email', 'password', 'password2', 'first_name', 'last_name', 'user_type', 'phone')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'user_type': {'required': True}
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs.pop('password2'):
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        # Remove password2 from the data
        validated_data.pop('password2', None)
        user = User.objects.create_user(**validated_data)
        return user

class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user information"""
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'phone', 'address', 'profile_picture')

class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for password change endpoint"""
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(
        required=True,
        validators=[validate_password]
    )

class ResetPasswordEmailSerializer(serializers.Serializer):
    """Serializer for requesting a password reset email"""
    email = serializers.EmailField(required=True)

class ResetPasswordSerializer(serializers.Serializer):
    """Serializer for password reset"""
    password = serializers.CharField(
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    token = serializers.CharField(required=True)
    uidb64 = serializers.CharField(required=True)

class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile"""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = '__all__'

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom token serializer to include additional user data in the response"""
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        
        # Add extra responses here
        data['user'] = UserSerializer(self.user).data
        return data
