from rest_framework import serializers
from django.contrib import admin

from .models.models import LocalEvent
from .serializers.serializers import LocalEventSerializer

from .models.client_models import Client
from .serializers.client_serializers import ClientModelSerializer

from .models.client_models import HelpRequest
from .serializers.client_serializers import HelpRequestSerializer

from .models.vlntr_models import ReferalCodes
from .serializers.vlntr_serializers import ReferalCodesSerializer

from .models.vlntr_models import Volounteer
from .serializers.vlntr_serializers import VolounteerModelSerializer

@admin.register(LocalEvent)
class LocalEventAdmin(admin.ModelAdmin):
    list_display = ['name', 'data_start', 'description']
    search_fields = ['name', 'description']
    list_filter = ['data_start', 'data_end']
    date_hierarchy = 'data_start'
    ordering = ['data_start',]

    def save_model(self, request, obj, form, change):
        if LocalEvent.objects.filter(name=form.cleaned_data['name']).exists():
            event = LocalEvent.objects.get(name=form.cleaned_data['name'])
            for field, value in form.cleaned_data.items():
                setattr(event, field, value)
            event.save()
        
        serializer = LocalEventSerializer(data=form.cleaned_data)

        if serializer.is_valid():
            serializer.save()
        else:
            raise serializers.ValidationError(serializer.errors)

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone']
    search_fields = ['name', 'phone']
    ordering = ['name',]

    def save_model(self, request, obj, form, change):
        if Client.objects.filter(phone=form.cleaned_data['phone']).exists():
            client = Client.objects.get(phone=form.cleaned_data['phone'])
            for field, value in form.cleaned_data.items():
                setattr(client, field, value)
            client.save()
        
        serializer = ClientModelSerializer(data=form.cleaned_data)

        if serializer.is_valid():
            serializer.save()
        else:
            raise serializers.ValidationError(serializer.errors)

@admin.register(HelpRequest)
class HelpRequestAdmin(admin.ModelAdmin):
    list_display = ['author', 'description']
    search_fields = ['author', 'description']
    list_filter = ['created', 'expiration']
    date_hierarchy = 'created'
    ordering = ['created',]

    def save_model(self, request, obj, form, change):
        if HelpRequest.objects.filter(description=form.cleaned_data['description']).exists():
            help_request = HelpRequest.objects.get(description=form.cleaned_data['description'])
            for field, value in form.cleaned_data.items():
                setattr(help_request, field, value)
            help_request.save()
        
        serializer = HelpRequestSerializer(data=form.cleaned_data)

        if serializer.is_valid():
            serializer.save()
        else:
            raise serializers.ValidationError(serializer.errors)

@admin.register(ReferalCodes)
class ReferalCodesAdmin(admin.ModelAdmin):
    list_display = ['name', 'code']
    search_fields = ['name','code']
    ordering = ['name',]

    def save_model(self, request, obj, form, change):
        if ReferalCodes.objects.filter(code=form.cleaned_data['code']).exists():
            referal_code = ReferalCodes.objects.get(code=form.cleaned_data['code'])
            for field, value in form.cleaned_data.items():
                setattr(referal_code, field, value)
            referal_code.save()
        
        serializer = ReferalCodesSerializer(data=form.cleaned_data)

        if serializer.is_valid():
            serializer.save()
        else:
            raise serializers.ValidationError(serializer.errors)

@admin.register(Volounteer)
class VolounteerAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone']
    search_fields = ['name', 'phone']
    ordering = ['name',]

    def save_model(self, request, obj, form, change):
        if Volounteer.objects.filter(phone=form.cleaned_data['phone']).exists():
            volounteer = Volounteer.objects.get(phone=form.cleaned_data['phone'])
            for field, value in form.cleaned_data.items():
                setattr(volounteer, field, value)
            volounteer.save()
        
        serializer = VolounteerModelSerializer(data=form.cleaned_data)

        if serializer.is_valid():
            serializer.save()
        else:
            raise serializers.ValidationError(serializer.errors)
