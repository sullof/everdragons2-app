#!/usr/bin/env bash

docker stop everdragons2-com
docker rm everdragons2-com

docker run -d \
  --name everdragons2-com \
  -p 6660 \
  --restart unless-stopped \
  -v $PWD:/usr/src/app \
  -v /vol/log/everdragons2-com_app:/var/log/everdragons2-com_app \
  -e NODE_ENV=production \
  -e VIRTUAL_HOST=everdragons2.com,www.everdragons2.com \
  -e LETSENCRYPT_HOST=everdragons2.com,www.everdragons2.com \
  -e LETSENCRYPT_EMAIL=everdragons2@sullo.co \
  -w /usr/src/app node:22 npm run start
