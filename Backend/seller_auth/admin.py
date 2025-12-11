from django.contrib import admin
from .models import SellerInfo

# Register your models here.

class SellerInfoAdmin(admin.ModelAdmin):
    """
    Admin interface for SellerInfo model
    """
    list_display = ('seller_id', 'user', 'mobile', 'email', 'is_active', 'date_time_joined')
    list_filter = ('is_active', 'date_time_joined')
    search_fields = ('seller_id', 'email', 'mobile', 'user__username', 'user__first_name', 'user__last_name')
    readonly_fields = ('date_time_joined',)
    fieldsets = (
        ('Seller Information', {
            'fields': ('seller_id', 'user', 'is_active')
        }),
        ('Contact Information', {
            'fields': ('email', 'mobile')
        }),
        ('Timestamps', {
            'fields': ('date_time_joined',),
            'classes': ('collapse',)
        }),
    )

admin.site.register(SellerInfo, SellerInfoAdmin)
