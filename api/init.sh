#!/bin/bash

python manage.py migrate
python manage.py createsuperuser --noinput
python manage.py loaddata init_fixture.json