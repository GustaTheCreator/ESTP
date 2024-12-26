#base/models.py
import random
from datetime import timezone
from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True)
    face_id = models.CharField(max_length=255, null=True, blank=True)  # For AWS Rekognition

class LoanRequest(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
          ('INTERVIEW', 'Interview Required'),
        ('REJECTED', 'Rejected'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    duration_months = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    credit_score = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"LoanRequest {self.id} by {self.user.username}"
