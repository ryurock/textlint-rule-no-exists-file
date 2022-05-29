FROM node:16.15.0-bullseye-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
  openssl \
  libcurl4 \
  libgdbm-dev \
  ca-certificates \
  curl \
  git \
  ssh \
  locales \
  zip \
  unzip \
  vim \
  wget \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

ENV LANG=ja_JP.UTF-8 \
  LC_CTYPE=ja_JP.UTF-8

RUN locale-gen ja_JP.UTF-8 \
  && localedef -f UTF-8 -i ja_JP ja_JP.utf8

COPY docker/etc/profile.d/common.sh /root/.bashrc

WORKDIR /app
# COPY ./package.json ./package-lock.json ./

# RUN npm install
