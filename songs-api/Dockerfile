FROM node:11.15.0-alpine

LABEL maintainer="David Boyne <boyney123@>"

# add bash for wait script
RUN apk update
RUN apk upgrade
RUN apk add bash

WORKDIR /app
COPY . /app

# Script to wait for processes (required for mongo)
COPY ./scripts/wait-for-it.sh /usr/local
RUN chmod +x /usr/local/wait-for-it.sh

RUN npm install

USER nobody

EXPOSE 3000

CMD ["npm", "start"]