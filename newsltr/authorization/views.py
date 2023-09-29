from rest_framework_simplejwt.views import TokenObtainPairView

from authorization.serializers import CustomTokenObtainPairSerializer


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
