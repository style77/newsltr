FROM python:3.11
SHELL ["/bin/bash", "-c"]

ENV PIP_NO_CACHE_DIR off
ENV PIP_DISABLE_PIP_VERSION_CHECK on
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 0

RUN apt-get update \
    && apt-get install -y --force-yes \
    nano python3-pip gettext chrpath libssl-dev libxft-dev \
    libfreetype6 libfreetype6-dev  libfontconfig1 libfontconfig1-dev\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /code/

COPY ./newsltr/requirements.txt /code/
RUN pip install -r requirements.txt

COPY ./newsltr/ /code/

RUN if [ -n "$BUILD_COMMAND" ]; then eval $BUILD_COMMAND; fi
RUN useradd -ms /bin/bash code
USER code

# RUN if [ -f "manage.py" ]; then if [ "$DISABLE_COLLECTSTATIC" == "1" ]; then echo "collect static disabled"; else echo "Found manage.py, running collectstatic" && python manage.py collectstatic --noinput; fi;  else echo "No manage.py found. Skipping collectstatic."; fi;
# RUN if [ -f "manage.py" ]; then if [ "$DISABLE_MIGRATE" == "1" ]; then echo "migrate disabled"; else echo "Found manage.py, running migrate" && python manage.py migrate --noinput; fi;  else echo "No manage.py found. Skipping migrate."; fi;

