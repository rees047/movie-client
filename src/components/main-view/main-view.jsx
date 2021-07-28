import React from 'react';
import Axios from 'axios';

import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';

import {LoginView} from '../login-view/login-view';
import {RegisterView} from '../register-view/register-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {UserView} from '../user-view/user-view';

import  './main-view.scss';

export class MainView extends React.Component{

    constructor(){
        super();
        this.state = { //initial state is set to null
            movies : [],
            selectedMovie: null,
            user: null,
            userID: null
        }
        this.onLoggedOut = this.onLoggedOut.bind(this);
    }    

    componentDidMount(){       
       
        let accessToken = localStorage.getItem('token');

        if(accessToken !==null){
            this.setState({
                user: localStorage.getItem('user'),
                userID: localStorage.getItem('uid')
            });
            this.getMovies(accessToken);
        }else{
            this.setState({
                user: null,
                userID: null
            });
        }
    }

    /* when a user successfully logs in, this function updates the 'user' property in state to that *particular* user */
    onLoggedIn(authData){
        //console.log(authData);
        this.setState({
            user: authData.user.username,
            userID: authData.user._id
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        localStorage.setItem('uid', authData.user._id);
        this.getMovies(authData.token)
    }

    onLoggedOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('uid');
        this.setState({
            user: null
        });
    }

    render(){
        const {movies, user, userID} = this.state;   
        
        return (
            <Router>
                <Row className="main-view justify-content-md-center">

                <Switch>
               
                        <Route path="/register" render = {() => {
                            if(user) return <Redirect to="/" />
                            return <RegisterView />
                        }} />

                        <Route path="/users/:username" render = {({ match, history }) => {
                            if(!user) return <Redirect to="/" />
                            return <UserView onBackClick={() => history.goBack()} onLoggedOut={this.onLoggedOut} user={user} userID={userID} />
                        }} /> 

                        <Route path="/directors/:director" render = {({ match, history }) => {
                            if(!user) return <Redirect to="/" />
                            return <DirectorView movieData={movies.find(movie => movie.director.name === match.params.director)} onBackClick={() => history.goBack()} onLoggedOut={this.onLoggedOut} user={user} userID={userID} />
                        }} /> 

                        <Route path="/genre/:genre" render = {({ match, history }) => {
                            if(!user) return <Redirect to="/" />
                            return <GenreView movieData={movies.find(movie => movie.genre.name === match.params.genre)} onBackClick={() => history.goBack()} onLoggedOut={this.onLoggedOut} user={user} userID={userID} />
                        }} /> 

                        <Route path="/movies/:title" render = {({ match, history }) => {
                            if(!user) return <Redirect to="/" />
                            return <MovieView movieData={movies.find(movie => movie.title === match.params.title)} onBackClick={() => history.goBack()} onLoggedOut={this.onLoggedOut} user={user} userID={userID} />
                        }} /> 

                        <Route path="/movies" render ={() => {
                            if(!user) return <Redirect to="/" />
                            if (movies.length === 0) return <Col md={8}><p>No Movies Found!</p></Col>
                            return <MovieCard movieData={movies} onLoggedOut={this.onLoggedOut} user={user} userID={userID} />
                        }} />

                        <Route exact path="/" render = {() => {
                            if (user) return <Redirect to="/movies" />
                            return <LoginView onLoggedIn={newUser => this.onLoggedIn(newUser)} />
                        }} />
                    </Switch>
                </Row>
                
            </Router>
        );  
    }
    
    getMovies(token){

        Axios.get('https://cinefiles-api.herokuapp.com/movies',{
            headers : { Authorization : 'Bearer ' + token  }
        })
        /*Axios.get('http://localhost:8080/movies', {
            headers : { Authorization : `Bearer ${token}`  }
        })*/
        .then(response => {
            
            let movieData = response.data;
            let imageSRC = 'http://localhost:8080';        

            movieData.map((movie) => {
                movie.imagePath = imageSRC + movie.imagePath;
            });

            //console.log(response.data);
            //console.log(movieData); //after modified image path
            
            this.setState({
                movies: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });

    }

}