# Newsltr

Newsletter service for businesses and organizations.

## Development

### Requirements

- [Docker](https://docs.docker.com/install/)
- [Docker-compose](https://docs.docker.com/compose/install/)
- [Makefile](https://www.gnu.org/software/make/)
- [Git](https://git-scm.com/downloads)
- [Python 3](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)


### Setup

1. Install [Docker](https://docs.docker.com/install/) and [Docker-compose](https://docs.docker.com/compose/install/)
2. Clone repository `git clone https://github.com/style77/newsltr.git` and `cd newsltr/newsltr`
3. Run `cp .env.example .env` and fill in the environment variables
4. Go back to the root directory with `cd ..` and run `make up-dev` to start the development API environment (this will take a while)
5. Go to the `client` directory with `cd ../client` and run `npm install` to install the client dependencies and `npm run dev` to start the client