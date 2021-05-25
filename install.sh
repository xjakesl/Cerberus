#!/bin/bash
apt update && apt upgrade -y
apt install python3.8 pip3 ffmpeg npm apache2 libapache2-mod-wsgi-py3
a2enmod wsgi
pip3 install -r requirements.txt
npm install pm2 -g


