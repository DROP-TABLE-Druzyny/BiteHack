from rest_framework import serializers
from django.contrib import admin

from .models.models import LocalEvent
from .serializers.serializers import LocalEventSerializer

from .models.vlntr_models import ReferalCodes
from .serializers.vlntr_serializers import ReferalCodesSerializer

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
