from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import SellerInfo
from .serializers import (
    SellerRegistrationSerializer,
    SellerLoginSerializer,
    SellerInfoSerializer,
    UserSerializer
)


@api_view(['POST'])
@permission_classes([AllowAny])
def seller_register(request):
    """
    Register a new seller with User and SellerInfo
    """
    serializer = SellerRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        seller_info = serializer.save()
        user = seller_info.user
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Seller registered successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            },
            'seller_info': SellerInfoSerializer(seller_info).data,
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def seller_login(request):
    """
    Login seller and return JWT tokens with user first_name and last_name
    """
    serializer = SellerLoginSerializer(data=request.data)
    
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            # Get seller info
            try:
                seller_info = SellerInfo.objects.get(user=user)
                seller_data = SellerInfoSerializer(seller_info).data
            except SellerInfo.DoesNotExist:
                seller_data = None
            
            return Response({
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                },
                'seller_info': seller_data,
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Invalid username or password'
            }, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def seller_profile(request):
    """
    Get authenticated seller profile with first_name and last_name
    """
    user = request.user
    
    try:
        seller_info = SellerInfo.objects.get(user=user)
        seller_data = SellerInfoSerializer(seller_info).data
    except SellerInfo.DoesNotExist:
        seller_data = None
    
    return Response({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        },
        'seller_info': seller_data
    }, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def seller_profile_update(request):
    """
    Update seller profile including first_name and last_name
    """
    user = request.user
    
    # Update User fields
    if 'first_name' in request.data:
        user.first_name = request.data['first_name']
    if 'last_name' in request.data:
        user.last_name = request.data['last_name']
    if 'email' in request.data:
        user.email = request.data['email']
    user.save()
    
    # Update SellerInfo fields
    try:
        seller_info = SellerInfo.objects.get(user=user)
        if 'mobile' in request.data:
            seller_info.mobile = request.data['mobile']
        if 'email' in request.data:
            seller_info.email = request.data['email']
        seller_info.save()
        seller_data = SellerInfoSerializer(seller_info).data
    except SellerInfo.DoesNotExist:
        seller_data = None
    
    return Response({
        'message': 'Profile updated successfully',
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        },
        'seller_info': seller_data
    }, status=status.HTTP_200_OK)

