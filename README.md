# Newsltr

Newsletter service for businesses and organizations.

## Development

### Setup

1. Install [Docker](https://docs.docker.com/install/)
2. Clone repository `git clone https://github.com/style77/newsltr.git` and `cd newsltr/newsltr`
3. Run `cp .env.example .env` and fill in the environment variables
4. Go back to the root directory with `cd ..` and run `make up-dev` to start the development environment (this will take a while)
5. Go to the `client` directory with `cd ../client` and run `npm install` to install the client dependencies and `npm run dev` to start the client