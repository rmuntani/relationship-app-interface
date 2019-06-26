# Relationship APP Interface

This project is simply a relationship app interface clone implemented with React.

## Testing on your browser

After cloning the project on your machine, installing Docker and running script/setup, run script/node/build to generate a webpack'd js file and its other resources in server/public. Then, run script/server and access `localhost:4567/index.html`.

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

