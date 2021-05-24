#!/bin/sh

#Starting a worker for queue 'dev' with 12 Threads and naming it 'ytd_worker1@{hostname}'
celery -A app:celery worker --concurrency=12 -Q dev --loglevel=info -n ytd_worker1@%h
