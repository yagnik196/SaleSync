# backend/proofs/models.py

from django.db import models
from django.contrib.auth.models import User

class Proof(models.Model):
    PLATFORM_CHOICES = [
        ('Flipkart', 'Flipkart'),
        ('Meesho', 'Meesho'),
    ]

    order_id = models.CharField(max_length=100, unique=True)
    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES)
    video_path = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.platform} - {self.order_id}"