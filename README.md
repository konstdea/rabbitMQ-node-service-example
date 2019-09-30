# rabbitMQ-node-service-example

## Description

Demo service to practice to launch rabbitMQ with node using Docker, node core, koa framework.

## Install

To start project is required:

- install docker ([mac](https://docs.docker.com/docker-for-mac/install/) / [windows](https://docs.docker.com/docker-for-windows/install/))
- run docker compose `docker-compose up -d` from root folder.  

## Test

To load test was used nodejs package ["artillery"](https://artillery.io/)

- install artillery `npm install -g artillery`
- run load test script `artillery run artillery-config.yml`

_P.S. artillery [documentation](https://artillery.io/docs/)_ 
