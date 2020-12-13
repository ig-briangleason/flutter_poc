#!/usr/bin/env bash
set -e

if [ $# -eq 0 ]; then
    echo "ERROR: No deployment server given.";
    exit 2
fi

GIT_HASH=$(git rev-parse --short HEAD)
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
APP_NAME=$1

function deploy_cmd() {
    APP_NAME=$1
    GIT_BRANCH=$2

    git push --force https://git.heroku.com/${APP_NAME}.git ${GIT_BRANCH}:refs/heads/master
}

set -x

deploy_cmd ${APP_NAME} ${GIT_BRANCH}