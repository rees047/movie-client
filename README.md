# MOVIE-API CLIENT
MOVIE-API CLIENT using React Library

**DESCRIPTION:** This project is made as the face or client view of the movie-api app

Registered users will have to login to able to see the movie database.
Unregistered users will have to make an account to be granted access.

The endpoints are tested using postman to make sure they are working

Endpoints are:
[post]    register:               /register
[get]     get all movies:         /movies
[get]     get single movie:       /movies/:movie
[get]     get genre:              /movies/genre/:genrename
[get]     get director:           /director/:director
[get]     get username:           /users/:username
[post]    add favorite movie:     /users/:username/movies/:movietitle
[delete]  delete favorite movie:  /users/:username/movies/:movietitle
[delete]  delete user profile:    /users/:username

**OJECTIVE:** To show the capability of React Library

**LIVE DEMO:**: https://cinefiles.netlify.app/

**TECHNOLOGIES**:
"dependencies": {
  "axios": "^0.21.1",  
  "prop-types": "^15.7.2",  
  "react": "^17.0.2",  
  "react-bootstrap": "^1.6.1",  
  "react-dom": "^17.0.2",  
  "react-redux": "^7.2.4",  
  "react-router-dom": "^5.2.0",  
  "redux": "^4.1.0",  
  "redux-devtools-extension": "^2.13.9"  
},
"devDependencies": {
  "@parcel/transformer-image": "^2.0.0-nightly.2400",
  "@parcel/transformer-sass": "^2.0.0-nightly.778",
  "parcel": "^2.0.0-nightly.776"
}

importing images:
url: works and  "@parcel/transformer-image": "^2.0.0-nightly.2400", in package.json works togethere in server
but for local development, delete  "@parcel/transformer-image": "^2.0.0-nightly.2400", to make it run locally

"main" : "src/index.html" does not work. main is only reserved for libraries.
