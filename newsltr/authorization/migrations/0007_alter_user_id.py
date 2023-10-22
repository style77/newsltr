# Generated by Django 4.2.5 on 2023-09-29 13:31

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):
    dependencies = [
        ("authorization", "0006_alter_user_managers"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
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
