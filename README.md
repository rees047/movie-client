MOVIE-API

This project is made as the face or client view of the movie-api app
This will be made using react library.

Registered users will have to login to able to see the movie database.
Unregistered users will have to make an account to be granted access.

The endpoints are tested using postman.
The endpoints used are those being declared in thhe movie-api app.

dependencies:
react
react-dom
node version 14
npm version 7.20.0
parcel-bundler

importing images:
url: works and  "@parcel/transformer-image": "^2.0.0-nightly.2400", in package.json works togethere in server

but for local development, delete  "@parcel/transformer-image": "^2.0.0-nightly.2400", to make it run locally

"main" : "src/index.html" does not work. main is only reserved for libraries.
