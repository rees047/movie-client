import React from 'react';
import Axios from 'axios';
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

    onRegisterClick(registerFlag){
        this.setState({
            registerFlag: registerFlag
        });
    }

    render(){
        const {movies, selectedMovie, user, registerFlag} = this.state;

        /* if there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView */
        if(!user && !registerFlag)
            return <LoginView onLoggedIn={newUser => this.onLoggedIn(newUser)} onRegisterClick={registerFlag => this.onRegisterClick(true)} />

        /* if register button is clicked, load Register View. */
        if(registerFlag)
            return <RegisterView onBackClick={registerFlag => this.onRegisterClick(false)} />

        // before the movies have been loaded
        if (movies.length === 0)
            return <div className="main-view"></div>;

        /* if the state of 'selectedMovie' is not null, that seleced movie will be returned otherwise, all *movies will be returned*  */
        return (
            <Row className="main-view justify-content-md-center">
                { selectedMovie
                    ?   (
                            <Col md={8}>
                                <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        )
                    :   movies.map(movie => ( 
                            <Col md={3} key={movie._id}>
                                <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} /> 
                            </Col>
                        ))
                }
            </Row>
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