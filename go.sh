#!/usr/bin/env bash

INT_REPO=172.21.3.76:5001
UAT_REPO=172.21.2.76:5000
ENV=$2

function build {

  docker run --rm \
    -v $(pwd):/opt/app \
    -v /tmp/npm-caches:/app/node_modules \
    -v /root/.ssh:/root/.ssh \
    -w /opt/app \
    ${INT_REPO}/common/node:7.7-debian npm install

  docker run --rm \
    -v $(pwd):/opt/app \
    -v /tmp/npm-caches:/app/node_modules \
    -v /root/.ssh:/root/.ssh \
    -w /opt/app \
    ${INT_REPO}/common/node:7.7-debian npm run build:$ENV

  docker build -t ${INT_REPO}/${PROJECT_NAME}/${SERVICE_NAME}:$ENV$GO_PIPELINE_COUNTER .
  docker push ${INT_REPO}/${PROJECT_NAME}/${SERVICE_NAME}:$ENV$GO_PIPELINE_COUNTER
  docker rmi ${INT_REPO}/${PROJECT_NAME}/${SERVICE_NAME}:$ENV$GO_PIPELINE_COUNTER
}


function e2e {
    docker run --rm -v $(pwd):/opt/app -v /etc/hosts:/etc/hosts -e NODE_ENV=dev -w /opt/app ${PRIVATE_REPO}/otr/nodejava:6.6-8 npm run e2e
}

function deploy {
  case $ENV in
    qa|integ )
      PRIVATE_REPO=$INT_REPO
      ;;
    uat )
      PRIVATE_REPO=$UAT_REPO
      ;;
    * )
      ;;
  esac
  IMAGE_VERSION="${ENV}${GO_PIPELINE_COUNTER}"
  IMAGE_NAME=${PRIVATE_REPO}/${PROJECT_NAME}/${SERVICE_NAME}:${IMAGE_VERSION}
  STACK_NAME=${ENV}-${PROJECT_NAME}
  sed -i "s#<IMAGE_NAME>#${IMAGE_NAME}#g" docker-compose.yml
  rancher-compose -p ${STACK_NAME} up --batch-size 1 -d -c --upgrade
}

function display-usage {
    echo "Usage: $0 [ build | deploy ] ENV"
}


case $1 in
	build)
		build
		;;
	deploy)
		deploy
		;;
	e2e)
		e2e
		;;
	*)
		display-usage
		exit -1
esac
