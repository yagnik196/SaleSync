from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class DashboardView(APIView):
    # This is the line that tells DRF to enforce authentication for this view.
    # It checks if a valid token was provided.
    permission_classes = [IsAuthenticated]              # Do not allow anyone to access this view unless they provide a valid token.
    def get(self, request):
        # This code will only run if the user is authenticated.
        content = {'message': 'Success! You have accessed a protected endpoint.'}
        return Response(content)
