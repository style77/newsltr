# Generated by Django 4.2.6 on 2023-10-19 15:37

import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("workspaces", "0006_workspaceapikey"),
    ]

    operations = [
        migrations.AlterField(
            model_name="workspaceapikey",
            name="id",
            field=models.CharField(
                default=uuid.uuid4,
                editable=False,
                max_length=36,
                primary_key=True,
                serialize=False,
                unique=True,
            ),
        ),
    ]
