import React from 'react';
import Axios from 'axios';

import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import axios from 'axios';

export class MainView extends React.Component{

    constructor(){
        super();
        this.state = {
            movies : [
                {
                    _id : 1,
                    title: "Inception",
                    description: "Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someone's mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobb's every move.",
                    director: "Christopher Nolan",
                    genre: "Sci-Fi",
                    rating: "PG-13",
                    release: "July 13, 2010", 
                    imagePath: "https://images.pexels.com/photos/804416/pexels-photo-804416.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                },
                {
                    _id : 2,
                    title: "The Shawshank Redemption",
                    description: "Andy Dufresne (Tim Robbins) is sentenced to two consecutive life terms in prison for the murders of his wife and her lover and is sentenced to a tough prison. However, only Andy knows he didn't commit the crimes. While there, he forms a friendship with Red (Morgan Freeman), experiences brutality of prison life, adapts, helps the warden, etc., all in 19 years.",
                    director: "Frank Darabont",
                    genre: "Crime",
                    rating: "R",
                    release: "September 22, 1994", 
                    imagePath: "https://images.pexels.com/photos/8104373/pexels-photo-8104373.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                },
                {
                    _id : 3,
                    title: "Gladiator",
                    description: "Gladiator is a 2000 epic historical drama film directed by Ridley Scott and written by David Franzoni, John Logan, and William Nicholson. ... Crowe portrays Roman general Maximus Decimus Meridius, who is betrayed when Commodus, the ambitious son of Emperor Marcus Aurelius, murders his father and seizes the throne.",
                    director: "Ridley Scott",
                    genre: "Action",
                    rating: "R",
                    release: "May 5, 2000",                   
                    imagePath: "https://images.pexels.com/photos/4172678/pexels-photo-4172678.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                }
            ],
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

    /*componentDidMount(){
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
    }*/

}