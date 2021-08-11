from django.db import models
from datetime import datetime, timedelta

# Create your models here.
# Product  Model..
class Products(models.Model):

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, null=True)
    tag = models.TextField(max_length=255, null=True)
    category = models.CharField(max_length=255, null=True)
    descripition = models.TextField(null=True)
    image = models.FileField(null=True)
    price = models.IntegerField(null=True)
    compare_price = models.IntegerField(null=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=datetime.now()+timedelta(days=30)) 
    updated_at =  models.DateTimeField(auto_now_add=True, null=True)
    deleted_at =  models.DateTimeField(null=True)

