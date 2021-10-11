#!/usr/bin/env bash

docker run -it --rm \
  --name everdragons2-com-dev \
  -p 6660 \
  -v $PWD:/usr/src/app \
  -v $PWD/log:/var/log/everdragons2-com \
  -e NODE_ENV=development \
  -e VIRTUAL_HOST=everdragons2.com.localhost,www.everdragons2.com.localhost \
  -w /usr/src/app node:12.20.0-alpine3.10 npm run start
