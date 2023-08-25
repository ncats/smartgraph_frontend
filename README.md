# SmartGraph UI

## Overview 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3.

This code is meant to run in tandem with the SmartGraph backend which contains the SmartGraph API, Neo4j instance and Websocket server. The repository for that project can be found [here](https://github.com/ncats/smartgraph_api/tree/dev).

## To Cite

Zahoránszky-Kőhalmi, G., Sheils, T. & Oprea, T.I. SmartGraph: a network pharmacology investigation platform. J Cheminform 12, 5 (2020). [https://doi.org/10.1186/s13321-020-0409-9]( https://doi.org/10.1186/s13321-020-0409-9)

## Configuration

The SmartGraph UI is set up with multiple build configurations that set the code up to link to different websocket urls. By default, for development, the code will hit a local websocket URL at 'ws://localhost:1338'. The production build hits the deployed SmartGraph websocket. There is also an environment file which is setup to run the code in development mode while hitting the deployed websocket.

All of the available configurations can be found in the 'src/environments' folder.

## Installation

To get the code running locally, use the following command to install the needed dependencies:

`npm install -g @angular/cli && npm install`

## Running locally

The code base can be run locally using the following commands:

`ng serve` - To run with default local configuration

`ng serve --configuration={production|local|local-deployedws}` - To run with a specified configuration

## Building the code

The code base can be built locally using the following commands:

`ng build` - To run with default local configuration

`ng build --configuration={production|local|local-deployedws}` - To run with a specified configuration

## Building and Running the container

The docker container for the UI runs the application out of a NGINX server on port 4200.

To build this container you can either build the docker compose file with `docker compose -f docker-compose.yml build` or `docker build -t smartgraph-ui .`

The container can than be run with either `docker compose -f docker-compose.yml up` or `docker run -p 4200:4200 smartgraph-ui`
