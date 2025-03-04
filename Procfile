release: python manage.py makemigrations && python manage.py migrate
web: python manage.py collectstatic --noinput && gunicorn wonder_roads_api.wsgi:application
