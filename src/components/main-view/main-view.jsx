import React from 'react';
import Axios from 'axios';

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
            registerFlag: null,
            user: null
        }
    }

    /* when a movie is clicked, this function is invocked and updates the sate of the 'selectedMovie' property to that movie */
    setSelectedMovie(newSelectedMovie){
        this.setState({
            selectedMovie : newSelectedMovie
        });
    }

    /* when a user successfully logs in, this function updates the 'user' property in state to that *particular* user */
    onLoggedIn(newuser){
        this.setState({
            user: newuser
        });
    }

    onRegister(register) {
        this.setState({
          register
        });
    }

    render(){
        const {movies, selectedMovie, user, registerFlag} = this.state;

        /* if there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView */
        if(!user)
            return <LoginView onLoggedIn={newUser => this.onLoggedIn(newUser)} />        

        // before the movies have been loaded
        if (movies.length === 0)
            return <div className="main-view"></div>;

        /* if the state of 'selectedMovie' is not null, that seleced movie will be returned otherwise, all *movies will be returned*  */
        return (
            <div className="main-view">
                { selectedMovie
                    ?   <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie =>
                        {this.setSelectedMovie(newSelectedMovie); }} />
                    :   movies.map(movie => (
                        <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} /> ))
                }
            </div>
        );  
    }

    componentDidMount(){
        Axios.get('https://cinefiles-api.herokuapp.com/movies')
        //Axios.get('http://localhost:8080/movies')
        .then(response => {
            //console.log(response.data);
            this.setState({
                movies: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

}