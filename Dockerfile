FROM node:20.12.2

RUN set -eux ; \
  apt-get update ; apt-get upgrade -y

RUN set -eux ; \
  apt-get update ; apt-get install -y \
  wget

RUN set -eux ; \
  mkdir /ghjk ; cd /ghjk ; \
  wget https://dl.xpdfreader.com/xpdf-tools-linux-4.05.tar.gz ; \
  tar -xvof xpdf-tools-linux-4.05.tar.gz ; \
  cp "/ghjk/xpdf-tools-linux-4.05/bin64/"* /usr/local/bin ; \
  rm -rf /ghjk

WORKDIR /app

COPY app/package*.json .
RUN npm install

COPY app .

RUN chmod a+x /app/entrypoint.sh

EXPOSE 8080
ENTRYPOINT [ "/app/entrypoint.sh", "hang" ]
