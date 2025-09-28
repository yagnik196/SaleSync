# backend/proofs/serializers.py

from rest_framework import serializers
from .models import Proof

class ProofSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proof
        fields = ['id', 'order_id', 'platform', 'video_path', 'created_at', 'user']