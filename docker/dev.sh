#!/usr/bin/env bash

docker run -it --rm \
  --name offficiallly-com-dev \
  -p 6660 \
  -v $PWD:/usr/src/app \
  -v $PWD/log:/var/log/offficiallly-com \
  -e NODE_ENV=development \
  -e VIRTUAL_HOST=everdragons2.com.localhost,www.everdragons2.com.localhost \
  -w /usr/src/app node:16 npm run start
