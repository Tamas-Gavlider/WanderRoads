release: python manage.py makemigrations && python manage.py migrate
web: gunicorn wonder_roads_api.wsgi:application
