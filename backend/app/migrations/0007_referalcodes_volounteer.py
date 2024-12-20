# Generated by Django 5.1.3 on 2024-12-15 01:37

import django.db.models.deletion
import phone_field.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_rename_date_helprequest_expiration_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReferalCodes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=64, unique=True)),
                ('name', models.CharField(blank=True, default='Organizacja', max_length=64)),
                ('details', models.TextField(blank=True, default='Brak informacji o danej organizacji', max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Volounteer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('name', models.CharField(blank=True, default='Użytkownik', max_length=64)),
                ('phone', phone_field.models.PhoneField(blank=True, help_text='Numer telefonu w formacie +48 123 456 789', max_length=31, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('access_token', models.CharField(blank=True, max_length=256, unique=True)),
                ('referal_code', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.referalcodes')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
