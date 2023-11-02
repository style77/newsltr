newsltr-api: gunicorn newsltr.newsltr.wsgi --log-file -
release: bash release.sh
newsltr-beat: celery -A newsltr.newsltr beat -S redbeat.RedBeatScheduler --loglevel=DEBUG --pidfile /tmp/celerybeat.pid
newsltr-worker: celery -A newsltr.newsltr worker -Q default -n project.%%h --without-gossip --without-mingle --without-heartbeat --loglevel=INFO --max-memory-per-child=512000 --concurrency=1
