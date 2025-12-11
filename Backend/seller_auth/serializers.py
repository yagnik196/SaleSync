from rest_framework import serializers
from django.contrib.auth.models import User
from .models import SellerInfo


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for Django User model - exposes first_name and last_name
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class SellerInfoSerializer(serializers.ModelSerializer):
    """
    Serializer for SellerInfo model with nested User data
    """
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = SellerInfo
        fields = ['id', 'user', 'seller_id', 'email', 'mobile', 'date_time_joined', 'is_active']


class SellerRegistrationSerializer(serializers.Serializer):
    """
    Serializer for seller registration with both User and SellerInfo data
    """
    # User fields
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    
    # SellerInfo fields
    seller_id = serializers.CharField(max_length=50)
    mobile = serializers.CharField(max_length=10)
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Username already exists')
        return value
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already registered')
        if SellerInfo.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already registered')
        return value
    
    def validate_mobile(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError('Mobile must be exactly 10 digits')
        if SellerInfo.objects.filter(mobile=value).exists():
            raise serializers.ValidationError('Mobile number already registered')
        return value
    
    def validate_seller_id(self, value):
        if SellerInfo.objects.filter(seller_id=value).exists():
            raise serializers.ValidationError('Seller ID already exists')
        return value
    
    def create(self, validated_data):
        # Create User
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        
        # Create SellerInfo
        seller_info = SellerInfo.objects.create(
            user=user,
            seller_id=validated_data['seller_id'],
            email=validated_data['email'],
            mobile=validated_data['mobile'],
        )
        
        return seller_info


class SellerLoginSerializer(serializers.Serializer):
    """
    Serializer for seller login
    """
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
