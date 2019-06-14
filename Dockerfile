FROM node:8-slim

RUN mkdir react
COPY package.json react/
WORKDIR 'react/'