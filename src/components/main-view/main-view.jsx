import React from 'react';
import Axios from 'axios';

import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import axios from 'axios';

export class MainView extends React.Component{

    constructor(){
        super();
        this.state = {
            movies : [],
            selectedMovie: null
        }
    }

    setSelectedMovie(newSelectedMovie){
        this.setState({
            selectedMovie : newSelectedMovie
        });
    }

    render(){
        const {movies, selectedMovie} = this.state;

        if (movies.length === 0){
            return <div className="main-view"></div>;
        }

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
        //axios.get('https://cinefiles-api.herokuapp.com/movies')
        axios.get('http://localhost:8080/movies')
        .then(response => {
            console.log(response.data);
            this.setState({
                movies: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

}