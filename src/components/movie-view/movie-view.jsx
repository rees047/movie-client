import React from 'react';
import PropTypes from 'prop-types';

import  './movie-view.scss';

export class MovieView extends React.Component{

    keypressCallback(event){
        console.log(event.key);
    }

    componentDidMount(){
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount(){
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render(){
        const {movieData, onBackClick } = this.props;
        return (
            <div className="movie-view movie-details-container">
                <div className="movie-image">
                    <img src={movieData.imagePath} width="200" height="300" />
                </div>
                <div className="movie-title movie-details-container">
                    <span className="label">Title: </span>
                    <span className="value">{movieData.title}:</span>
                </div>
                <div className="movie-director movie-details-container">
                    <span className="label">Rating: </span>
                    <span className="value">{movieData.rating.name}</span>
                </div>
                <div className="movie-director movie-details-container">
                    <span className="label">Genre: </span>
                    <span className="value">{movieData.genre.name}</span>
                </div>
                <div className="movie-director movie-details-container">
                    <span className="label">Release Date: </span>
                    <span className="value">{movieData.release}</span>
                </div>
                <div className="movie-director movie-details-container">
                    <span className="label">Director: </span>
                    <span className="value">{movieData.director.name}</span>
                </div>
                <div className="movie-description movie-details-container">
                    <span className="label">Description: </span>
                    <span className="value">{movieData.description}:</span>
                </div>     
                <br/>
                <button className="cursor-pointer" onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }

}

MovieView.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        budget: PropTypes.string,
        cast: PropTypes.array,
        diretor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string,
            birthdate: PropTypes.string,
            deathdate: PropTypes.string,
        }),
        featured: PropTypes.string,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string
        }),
        gross: PropTypes.string,
        imagePath: PropTypes.string,
        rating: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string
        }),
        release: PropTypes.string,
        runtime: PropTypes.string,
        year: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}