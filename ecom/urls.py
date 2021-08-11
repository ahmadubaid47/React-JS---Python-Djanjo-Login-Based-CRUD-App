
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User
from product import views
from product import api_urls
from django.conf import settings
from django.conf.urls.static import static

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    path('admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls')),
    path('ecom/', include(api_urls)),
]
if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
