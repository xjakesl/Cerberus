#!/bin/sh

apt update && apt upgrade -y
apt install python3.8 pip3 ffmpeg npm
pip3 install -r requirements.txt
pip3 install ffmpeg-python
npm install pm2 -g
mkdir "songs"
