# Generated by Django 4.2.6 on 2023-10-26 15:08

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("payments", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="metadata",
            field=models.JSONField(blank=True, null=True),
        ),
    ]
