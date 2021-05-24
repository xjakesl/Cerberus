#!/bin/sh

# Replace 33 with the result of "id -u www-data"
# Optional: Replace ytd_worker1@%h with {worker_name}@%h
# Use 'pm2 start worker.sh to start the beat

#Starting a worker for queue 'dev' with 12 Threads and naming it 'ytd_worker1@{hostname}'
celery -A app:celery worker --concurrency=12 -Q dev --uid 33 -n ytd_worker1@%h
