from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from .models import Profile, EmailVerificationToken

User = get_user_model()

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'

class EmailVerificationTokenInline(admin.StackedInline):
    model = EmailVerificationToken
    can_delete = False
    verbose_name_plural = 'Email Verification Token'
    max_num = 1
    extra = 0

class UserAdmin(BaseUserAdmin):
    """Define admin model for custom User model with no username field."""
    inlines = (ProfileInline, EmailVerificationTokenInline)
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'user_type', 'phone', 'address', 'profile_picture')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'is_verified', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'user_type'),
        }),
    )
    
    list_display = ('email', 'first_name', 'last_name', 'user_type', 'is_staff', 'is_verified')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'user_type')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)
    
    # Override username field to None since we use email
    username = None
    
    def get_inline_instances(self, request, obj=None):
        if not obj:
            return []
        return super().get_inline_instances(request, obj)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'website')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'bio')
    list_filter = ('user__user_type',)
    raw_id_fields = ('user',)

class EmailVerificationTokenAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at')
    search_fields = ('user__email', 'token')
    list_filter = ('created_at',)
    raw_id_fields = ('user',)
    date_hierarchy = 'created_at'

# Register models
admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(EmailVerificationToken, EmailVerificationTokenAdmin)
