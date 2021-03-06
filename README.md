# Relationship APP Interface

This project is a relationship app interface clone implemented with React/Redux.

## Testing on your browser

After cloning the project on your machine, installing Docker and running script/setup, run script/node/build to generate a webpack'd js file and its other resources in server/public. Then, run script/server and access `localhost:4567/index.html`.

To make the chat work, run script/node/websocket. Messages are broadcasted to all clients connected to the server.

Images are not available from the get go. server/public/pictures should be populated for the app to show profiles' pictures.

## About style/animations

This project uses only inline style, and all the configurations are at app.config.js.
Animations where implemented using Pose. Their specifications are inside the components.

## About the application structure

The React components in this project are divided in *presentational* componenents, called *components*, and *container* components, called *containers*, similar to what is done on Redux's docs. Tests are divided in *components* tests, that are almost like unit-tests and are centered around testing props and functions, and *container* tests, where a *container* with it's *component* is tested.

## Scripts

### Setup

```bash
    $ script/setup
```

Pulls and setups required Docker images.

### Server

```bash
    $ script/server
```

Runs the Sinatra application on port 4567.

### Clean

```bash
    $ script/clean
```

Removes Docker images created with script/setup

### Node

```bash
    $ script/node/bash
```

Runs bash on the Docker image with node.

```bash
    $ script/node/build
```

Runs webpack on the project, according to webpack.config.js

```bash
    $ script/node/test
```

Runs Jest test on the project, according to package.json

### Sinatra

```bash
    $ script/bash
```

Runs bash on the Docker image with Sinatra.

#### Icons

Like/dislike icons made by [Maxim Basinski](https://www.flaticon.com/authors/maxim-basinski) from www.flaticon.com

