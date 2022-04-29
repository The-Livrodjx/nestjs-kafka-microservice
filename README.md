<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

Nestjs microservice connecting in Kafka Apache

## Installation

```bash
$ cd kafka-microservice

$ npm install -g @nestjs/cli

$ npm install

$ docker-compose up -d

$ cd ..

$ cd kafka-microservice-client

$ npm install

```
## Create an .env file in /kafka-microservice as below example

```
  DATABASE = kafkamicroservice
  DB_HOST = localhost
  DB_PORT = 3306
  DB_USERNAME = root
  DB_PASSWORD = yourpass

```

## Running the app

```bash

$ cd kafka-microservice

$ npm run start

# In another terminal

$ cd kafka-microservice-client

$ npm run start

```