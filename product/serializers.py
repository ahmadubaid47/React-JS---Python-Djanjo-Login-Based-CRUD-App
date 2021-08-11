from django.contrib.auth.models import User, Group
from rest_framework import serializers
from product.models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Products
        fields = '__all__' 