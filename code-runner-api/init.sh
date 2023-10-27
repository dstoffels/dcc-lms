#!/bin/sh

dockerd &
sleep 5

export DOCKER_HOST=unix:///var/run/docker.sock

docker build -t runner ./runner-container

node app.js