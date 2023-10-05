.PHONY: test migrate runserver generateschema

test:
	@echo Running tests...
	cd newsltr && pipenv run python manage.py test

migrate:
	@echo Running migrations...
	cd newsltr && pipenv run python manage.py migrate

makemigrations:
	@echo Making migrations...
	cd newsltr && pipenv run python manage.py makemigrations

runserver:
	@echo Running server...
	cd newsltr && pipenv run python manage.py runserver

generateschema:
	@echo Generating schema...
	cd newsltr && pipenv run python manage.py generateschema --file openapi-schema.yml

up-dev:
	@echo Building dev image...
	docker build -t "newsltr-api:latest" -f newsltr/dev.Dockerfile .
	docker run -p 8000:8000 --name "newsltr-api" newsltr-api:latest

freeze:
	@echo Freezing dependencies...
	cd newsltr && pipenv run pip freeze > requirements.txt