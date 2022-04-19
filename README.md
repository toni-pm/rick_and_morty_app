!["Uploading exploit"](app/src/assets/img/text-logo.png "Uploading exploit")

# Rick & Morty Application

Rick &amp; Morty Application for Technical Challenge.

This application consumes the [The Rick and Morty API](https://rickandmortyapi.com).

The Backend is developed with Express and the Frontend with React & Redux.

Jest & Supertest has been used for the Backend testing, and Cypress for the Frontend.

## Postman Workspace

A Postman Workspace is attached as an add-on for the backend documentation.

[https://www.postman.com/red-sunset-395021/workspace/rick-morty-app/overview](https://www.postman.com/red-sunset-395021/workspace/rick-morty-app/overview)

## Live Demo

You can find a live demo at the Heroku link below. As it is deployed on Heroku, if it is not used in 30 min, you have to wait for the service to start.

https://tonipm-rick-and-morty-app.herokuapp.com/


If it doesn't work, blame the [The Rick and Morty API](https://rickandmortyapi.com) 😝😝

## Dependencies

Apart from the base libraries that were requested for the test, others have been added that are specified below.

### Backend
    
- axios

    To make requests to The Rick and Morty API.

- bcrypt

    Used for the generation of encrypted password hashes of the users. This library has been chosen because it is the one recommended by OWASP.

- cors

    Provides a Connect/Express middleware that can be used to enable CORS with various options.

- dotenv

    Used to handle the different environment variables of the application.

- express-validator

    Dependency to filter and sanitize the data received in requests.

- jsonwebtoken

    Library to handle authentication. We create the access tokens and validate the received authentications.

- log4js

    Used to decouple the logs from the backend. This can help us in case one day we decide to change the way of making the logs or send them to an Elasticsearch

- mongodb

    MongoDb has been used as the database engine. With this dependency we can handle it.

- mongodb-memory-server

    To create a MongoDb in memory to do the tests and avoid having a test database.

- mongoose

    Library that allows us to write MongoDb queries, validate types and other features related to the database.

- jest & supertest

    Dependencies used for testing.

- morgan

    Debug logs for development environment.

- nodemon

    Monitors code changes and automatically restarts the server.

- standard

    Linter to have an established code style, avoid bad practices and show syntax errors. Use ESLint.

### Frontend

- react-router-dom

    Allow navigation between components.

- redux-thunk

    Allows you to write actions that return a function instead of an action object. Used for asynchronous code.

- redux-devtools-extension

    It will help to filter everything that passes through the store, in order to see it from the Redux developers console.

- sass

    Syntactically Awesome Style Sheets
    Used to have a more ordered and scalable CSS code.

- cypress

    To perform End to End testing.

- eslint and subdependencies

    Linter to have an established code style, avoid bad practices and show syntax errors.


## Install & Usage

Clone repository:

```
$ git clone https://github.com/toni-pm/rick_and_morty_app.git
```

Backend needs an *.env* with the following required values (Inside *api/config/config.js* you can find the list with all available environment variables):

```
DATABASE_HOST="XXXXXX.mongodb.net"
DATABASE_NAME="XXXXXXXXXXXX"
DATABASE_PASSWORD="XXXXXXXXXXXX"
DATABASE_USERNAME="XXXXXXXXXXXX"
```

Frontend needs an *.env* with the following values:

```
REACT_APP_API_URL="http://localhost:8000/api"
```

Install backend dependencies and run:

```
$ cd rick_and_morty_app/api
$ yarn install
$ yarn dev
```

Install backend dependencies and run:

```
$ cd rick_and_morty_app/app
$ yarn install
$ yarn start
```

Run Backend tests:

```
$ cd rick_and_morty_app/api
$ yarn test
```

Run Frontend tests:

```
$ cd rick_and_morty_app/app
$ yarn cypress
```

## Some things to improve

- Dynamic MAX_PAGES. Add the maximum limit in the server filter from the data API.

- Mock *connect* method of *db.js* when the *NODE_ENV* environment variable is 'test'.

- Refactor test code to avoid repeating actions.