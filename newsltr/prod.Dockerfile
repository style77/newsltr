FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_DEVELOPMENT 0

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    cron \
    wkhtmltopdf \
    && rm -rf /var/lib/apt/lists/* !

COPY requirements.txt /tmp/requirements.txt
RUN set -ex && \
    pip install --upgrade pip && \
    pip install -r /tmp/requirements.txt && \
    rm -rf /root/.cache/

COPY . /app/

RUN python manage.py migrate

CMD ["gunicorn", "newsltr.wsgi:application", "--bind", "0.0.0.0:7000"]