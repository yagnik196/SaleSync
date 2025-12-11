from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Authentication
    path('register/', views.seller_register, name='seller_register'),
    path('login/', views.seller_login, name='seller_login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Profile
    path('profile/', views.seller_profile, name='seller_profile'),
    path('profile/update/', views.seller_profile_update, name='seller_profile_update'),
]
