# Newsltr

Newsletter service for businesses and organizations.

## Development

### Setup

1. Install [Docker](https://docs.docker.com/install/)
2. Clone repository `git clone https://github.com/style77/newsltr.git` and `cd newsltr`
3. Run `docker build -t "newsltr-api:latest" .` inside the `newsltr` directory to build the API image
4. Run `docker run -p 8000:8000 newsltr-api` to start the API
5. Go to the `client` directory and run `yarn` to install the client dependencies and `yarn dev` to start the client