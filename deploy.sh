#!/usr/bin/env bash

ng build --prod
rsync -a dist/tkapi-explorer-client/ tkapi@openkamer.org:/home/tkapi/tkapi-explorer-client
