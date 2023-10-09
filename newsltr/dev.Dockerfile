FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_DEVELOPMENT 1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app/

RUN python manage.py migrate

CMD ["bash", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]