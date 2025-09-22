from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import Student

User = get_user_model()


@receiver(post_save, sender=Student)
def create_student_user_account(sender, instance, created, **kwargs):
    """
    Create a user account for the student when a new student is created
    """
    if created and not instance.user and instance.email:
        # Create user account for student
        user = User.objects.create_user(
            email=instance.email,
            first_name=instance.first_name,
            last_name=instance.last_name,
            user_type='STUDENT',
            is_active=True
        )
        instance.user = user
        instance.save(update_fields=['user'])


@receiver(post_save, sender=Student)
def update_student_user_info(sender, instance, created, **kwargs):
    """
    Update user information when student information is updated
    """
    if not created and instance.user:
        user = instance.user
        user.first_name = instance.first_name
        user.last_name = instance.last_name
        user.email = instance.email or user.email
        user.is_active = instance.is_active()
        user.save(update_fields=['first_name', 'last_name', 'email', 'is_active'])


@receiver(pre_delete, sender=Student)
def handle_student_deletion(sender, instance, **kwargs):
    """
    Handle cleanup when a student is deleted
    """
    # Optionally deactivate the user account instead of deleting
    if instance.user:
        instance.user.is_active = False
        instance.user.save(update_fields=['is_active'])
