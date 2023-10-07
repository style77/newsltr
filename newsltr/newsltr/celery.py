import os
import ssl
from celery import Celery
from django.apps import apps

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "newsltr.settings")

app = Celery(
    "newsltr",
    broker_use_ssl={"ssl_cert_reqs": ssl.CERT_NONE},
    redis_backend_use_ssl={"ssl_cert_reqs": ssl.CERT_NONE},
)

app.config_from_object("django.conf:settings", namespace="CELERY")
app.conf.enable_utc = True

app.autodiscover_tasks(lambda: [n.name for n in apps.get_app_configs()])
