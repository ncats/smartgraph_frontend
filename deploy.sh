#!/bin/bash
export DOCKER_REPO_NAME_1=ncats/smartgraph_frontend
cat /home/deploy/config/local | python3 /home/deploy/jenkins/smartgraph-scb-ui/configure.py /home/deploy/config/sg_data_exchange/
#docker pull $DOCKER_REPO_NAME_1:$BUILD_VERSION
#docker tag $DOCKER_REPO_NAME_1:$BUILD_VERSION $DOCKER_REPO_NAME_1:current
cd /home/deploy/jenkins/smartgraph-scb-ui | docker-compose -f docker-compose-scb.yml up -d
