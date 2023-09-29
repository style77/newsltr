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