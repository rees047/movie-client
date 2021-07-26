import React from 'react';
import Axios from 'axios';

import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';

import {LoginView} from '../login-view/login-view';
import {RegisterView} from '../register-view/register-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

import  './main-view.scss';

export class MainView extends React.Component{

    constructor(){
        super();
        this.state = { //initial state is set to null
            movies : [],
            selectedMovie: null,
            user: null
        }
    }    

    /* when a user successfully logs in, this function updates the 'user' property in state to that *particular* user */
    onLoggedIn(authData){
        //console.log(authData);
        this.setState({
            user: authData.user.username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token)
    }

    onLoggedOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render(){
        const {movies, user} = this.state;       

        return (
            <Router>
                <Row className="main-view justify-content-md-center">

                        <Route exact path="/" render = {() => {
                            if(!user) return <LoginView onLoggedIn={newUser => this.onLoggedIn(newUser)} />
                               
                            

                            if (movies.length === 0)
                            return <div className="main-view"></div>


                            return movies.map(movie => (
                                <Col md={3} key={movie._id}>
                                    <MovieCard key={movie._id} movieData={movie} /> 
                                </Col>
                                //add logout button <button onClick={() => {this.onLoggedOut()}}>Logout</button>
                            ))
                            
                        }} />

                        <Route path="/register" render = {() => {
                            if(user) return <Redirect to="/" />

                            return
                            <RegisterView />
                        }} />

                        <Route path="/movies/:title" render = {({ match, history }) => {

                            return <Col md={8}>
                                <MovieView movieData={movies.find(movie => movie.title === match.params.title)} onBackClick={() => history.goBack()} />
                                <button onClick={() => {this.onLoggedOut()}}>Logout</button>
                            </Col>
                        }} /> 
                    
                </Row>
            </Router>
        );  
    }
    
    getMovies(token){

        /*Axios.get('https://cinefiles-api.herokuapp.com/movies',{
            headers : { Authorization : 'Bearer ' + token  }
        })*/
        Axios.get('http://localhost:8080/movies', {
            headers : { Authorization : `Bearer ${token}`  }
        })
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

    componentDidMount(){
        let accessToken = localStorage.getItem('token');

        if(accessToken !==null){
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

}