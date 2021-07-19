import React from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component{

    constructor(){
        super();
        this.state = {
            movies : [
                {
                    _id : 1,
                    Title: "Inception",
                    Description: "desc1",
                    ImagePath: ".."
                },
                {
                    _id : 2,
                    Title: "The Shawshank Redemption",
                    Description: "desc2",
                    ImagePath: ".."
                },
                {
                    _id : 3,
                    Title: "Gladiator",
                    Description: "desc2",
                    ImagePath: ".."
                }
            ],
            selectedMovie: null
        }
    }

    render(){
        const {movies, selectedMovie} = this.state;

        if (selectedMovie) return <MovieView movieData={selectedMovie} />

        if (movies.length === 0){
            return <div className="main-view"> The list is empty!</div>
        }else {
            return (
                <div className="main-view">
                    <button onClick={() => {
                        alert('Nice!')
                    }} >Click me!</button>
                    {movies.map((movie) => {
                        return <MovieCard key={movie._id} movieData={movie} />;
                    })}
                </div>
            );
        }       
    }
}