# Generated by Django 5.1.3 on 2024-12-15 07:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_referalcodes_volounteer'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='custom_pins',
            field=models.JSONField(blank=True, default=dict),
        ),
        migrations.DeleteModel(
            name='Profile',
        ),
    ]
