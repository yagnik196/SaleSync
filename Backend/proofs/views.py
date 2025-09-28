# backend/proofs/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Proof
from .serializers import ProofSerializer

class ProofViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows proofs to be viewed or edited.
    """
    queryset = Proof.objects.all().order_by('-created_at')
    serializer_class = ProofSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all the proofs
        for the currently authenticated user.
        """
        return Proof.objects.filter(user=self.request.user)