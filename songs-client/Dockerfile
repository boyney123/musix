FROM node:11.15.0-alpine

LABEL maintainer="David Boyne <boyney123@>"

RUN mkdir -p /usr/src/songs-client
WORKDIR /usr/src/songs-client

COPY package.json .

RUN npm install

COPY . ./

USER nobody

CMD ["npm", "start"]