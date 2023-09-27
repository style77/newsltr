# Newsltr

Newsletter service for businesses and organizations.

## Development

### Setup

1. Install [Docker](https://docs.docker.com/install/)
2. Clone repository `git clone https://github.com/style77/newsltr.git` and `cd newsltr/newsltr`
3. Run `cp .env.example .env` and fill in the environment variables
4. Run `docker build -t "newsltr-api:latest" dev.Dockerfile` inside the `newsltr` directory to build the API image
5. Run `docker run -p 8000:8000 newsltr-api` to start the API
6. Go to the `client` directory with `cd ../client` and run `npm install` to install the client dependencies and `npm run dev` to start the client