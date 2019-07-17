FROM node:11.15.0-alpine

LABEL maintainer="David Boyne <boyney123@>"

WORKDIR /app
COPY . /app

RUN npm install

USER nobody

EXPOSE 5000

CMD ["npm", "start"]