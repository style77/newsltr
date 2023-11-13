.PHONY: test migrate makemigrations runserver runcelery generateschema up-dev freeze flake8 black

# Development Commands

test:
	@echo Running tests...
	cd newsltr && pipenv run python manage.py test --noinput

migrate:
	@echo Running migrations...
	cd newsltr && pipenv run python manage.py migrate

makemigrations:
	@echo Making migrations...
	cd newsltr && pipenv run python manage.py makemigrations

runserver:
	@echo Running server...
	cd newsltr && pipenv run python manage.py runserver

stripe:
	@echo Running stripe webhook listener...
	pipenv run stripe listen --forward-to 127.0.0.1:8000/api/v1/payment/webhook/

pull-stripe:
	@echo Pulling stripe events...
	cd newsltr && pipenv run python manage.py pull_stripe

test-workspaces:
	@echo Testing Workspaces...
	cd newsltr && pipenv run python manage.py test --noinput ./workspaces/.

runcelery:
	@echo Running celery...
	cd newsltr && pipenv run celery -A newsltr worker -l info

generateschema:
	@echo Generating schema...
	cd newsltr && pipenv run python manage.py spectacular --file openapi-schema.yml

up-dev:
	@echo Building image...
	docker compose up

freeze:
	@echo Freezing dependencies...
	cd newsltr && pipenv run pip freeze > requirements.txt

# Code Quality Checks

flake8:
	@echo Running flake8...
	cd newsltr && pipenv run flake8 .

black:
	@echo Running black...
	cd newsltr && pipenv run black .

isort:
	@echo Running isort...
	cd newsltr && pipenv run isort .

mypy:
	@echo Running mypy...
	cd newsltr && pipenv run mypy .