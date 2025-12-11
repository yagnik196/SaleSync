from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

# Create your models here.

class SellerInfo(models.Model):
    """
    Model to store seller information linked to Django's default User model.
    first_name and last_name are stored in the User model.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='seller_info')
    seller_id = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    mobile = models.CharField(
        max_length=10,
        validators=[RegexValidator(r'^\d{10}$', 'Mobile must be exactly 10 digits')],
        unique=True
    )
    date_time_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-date_time_joined']
    
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.seller_id}"
