from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from product.serializers import UserSerializer, GroupSerializer, ProductsSerializer
from rest_framework.generics import GenericAPIView
from product.models import Products
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from django.utils.text import slugify
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.decorators import api_view
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status
import os
from django.conf import settings

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
class ProductViewSet(GenericAPIView):
    @classmethod
    def get(self,request):
        if request.GET.get('id'):
            productsData = Products.objects.get(pk=request.GET.get('id'))
            SnippetSerializer = ProductsSerializer(productsData)
        elif request.GET.get('slug'):
            productsData = Products.objects.get(slug=request.GET.get('slug'))
            SnippetSerializer = ProductsSerializer(productsData)
        else:
            productsData = Products.objects.all()
            SnippetSerializer = ProductsSerializer(productsData,many="true")
        response={"status":1,"message":"Product List","data":SnippetSerializer.data}
        return JsonResponse(response, safe=False)

    @classmethod
    def post(self,request):
        data = request.data
        data['slug']= slugify(request.data['title'])
        serializerData=''
        saveProduct = ProductsSerializer(data=data)
        if saveProduct.is_valid():
            saveProduct.save()
            serializerData=saveProduct.data
            statusResponse=status.HTTP_201_CREATED
        else:
            serializerData=saveProduct.errors
            statusResponse=status.HTTP_400_BAD_REQUEST
        response={"status":1,"message":"Product Added Successfully","statusResponse":statusResponse,"serializerData":serializerData}
        return JsonResponse(response, safe=False)
    def put(self,request,id=None):
        data = request.data
        instance = Products.objects.filter(pk=request.data['id']).first()
        dataimage=data.copy()
        if not dataimage['image']:
            dataimage.pop('image', None)
        serializer = ProductsSerializer(instance,data=dataimage)
        if serializer.is_valid():
            serializer.save()
        if  serializer:     
            data={'status':1,'message':'Size updated successfully.',"data":serializer.data}
            return JsonResponse(data,status=200,safe=False)
        else:
            data={'status':0,'message':'Oops. there was a problem.'}
            return JsonResponse(data,status=500,safe=False)
    @classmethod
    def delete(self,request,id=None):
        instance = Products.objects.filter(pk=request.GET.get('id')).first()
        try:
            image_path = os.path.join(settings.MEDIA_ROOT, str(instance.image))
            os.unlink(image_path)
        except:
            pass
        instance.delete()
        productsData = Products.objects.all()
        SnippetSerializer = ProductsSerializer(productsData,many="true")
        data={'status':1,'message':'Products deleted successfully.',"data":SnippetSerializer.data}
        return JsonResponse(data,safe=False)

@api_view(['GET', 'POST'])
def products_list(request):
    """
 List  products, or create a new Products.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        products = Products.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(products, 5)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = ProductsSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        
        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '//ecom/products/get/?page=' + str(nextPage), 'prevlink': '//ecom/products/get/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = ProductsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
