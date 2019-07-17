# Songs-API 🎵

NodeJS API built with express & mongodb to handle songs 🎵🎵

## Getting Started

```
git clone https://github.com/boyney123/songs-api.git
```

## Running the application

There are two ways to get the application running.

- Locally (outside of docker)
- Using Docker

### Locally

If you would like to run this locally (outside Docker) then you need to:

1. Make sure you have [mongo running on your machine](https://docs.mongodb.com/manual/installation/).
2. Rename `.env-example` to `.env`
3. `npm install && npm start`

If you would like to populate the database run:

```
npm run populate-database
```

### Using Docker

```
docker-compose up -d
```

_This should run the API and mongo within a docker environment_

If you want to populate the database run:

```
docker-compose exec songs-api npm run populate-database
```

## Running tests

If you want to run the tests locally you will need `mongo` running on your machine.

```
npm test
```

# API

## `/songs`

### `GET`

Returns an array of data for songs. Requires `limit` and `page` query string parameters.

Query String values:

- limit: Number - The number of songs to return
- page: Number - The page to return

Example:

http://localhost:3000/songs?page=1&limit=2 will return 2 songs for the first page. http://localhost:3000/songs?page=2&limit=2 will return the next 2 songs on page 2 and so on...

## `/download/{file}`

All the `mp3` files are served statically. You can download the `mp3` files using the `/download` API.

### `GET`

Returns the mp3 file.

Example: http://localhost:3000/download/Decision.mp3

All the mp3s that can be downloaded are in the `public/songs` directory.

---

# Suggestions for improvement 🤔

- Better formatting on the logs
- Possibly adding tests for mongoose models, but they are tested within the routes?
- Production configuration files if going into production in the future
- To get Mongo and Node working with docker-compose I had to use `wait-for-it.sh` file. (Which is [recommended](https://github.com/peter-evans/docker-compose-healthcheck/issues/3#issuecomment-329037485)). Given more time I wonder if this could be replaced with something better?
- Maybe cache the results rather than going to Mongo all the time? For this POC and small API its fine.
- Adding auth to Mongo
