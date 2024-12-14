from rest_framework import serializers
from django.contrib import admin
from django.core.exceptions import ValidationError

from .models import LocalEvent
from .serializers import LocalEventSerializer

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
