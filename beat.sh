#!/bin/sh

# Replace 33 with the result of "id -u www-data"
# Use 'pm2 start beat.sh to start the beat

#Starting beat for scheduled tasks
celery -A app:celery beat --uid 33