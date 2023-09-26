from django.urls import path, include

urlpatterns = [
    path(r'api/v1/', include('authorization.urls'))
]
