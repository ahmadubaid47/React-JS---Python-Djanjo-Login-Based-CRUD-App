from django.urls import path
from django.conf.urls import include
from product import views
from django.conf.urls import url

urlpatterns = [
	path('products/', views.ProductViewSet.as_view()),
]