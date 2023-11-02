#!/bin/bash
set -e
python newsltr/manage.py migrate
python newsltr/manage.py makesuperuser
