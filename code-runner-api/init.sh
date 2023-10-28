#!/bin/sh

dockerd &
sleep 5

export DOCKER_HOST=unix:///var/run/docker.sock

docker pull dstoffels/code-runner:1

node app.js