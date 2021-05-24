#!/bin/sh

#Starting beat for scheduled tasks
celery -A app:celery beat