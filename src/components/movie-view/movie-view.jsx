import React from 'react';

export class MovieView extends React.Component{
    render(){
        const {movieData, onBackClick } = this.props;
        return (
            <div className="movie-view movie-details-container">
                <div className="movie-image">
                    <img src={movieData.ImagePath} width="200" height="300" />
                </div>
                <div className="movie-title movie-details-container">
                    <span className="label">Title: </span>
                    <span className="value">{movieData.Title}:</span>
                </div>
                <div className="movie-director movie-details-container">
                    <span className="label">Rating: </span>
                    <span className="value">{movieData.Rating}</span>
                </div>
                <div className="movie-director movie-details-container">
                    <span className="label">Genre: </span>
                    <span className="value">{movieData.Genre}</span>
                </div>
                <div className="movie-director movie-details-container">
                    <span className="label">Release Date: </span>
                    <span className="value">{movieData.Release}</span>
                </div>
                <div className="movie-director movie-details-container">
                    <span className="label">Director: </span>
                    <span className="value">{movieData.Director}</span>
                </div>
                <div className="movie-description movie-details-container">
                    <span className="label">Description: </span>
                    <span className="value">{movieData.Description}:</span>
                </div>     
                <br/>
                <button class="cursor-pointer" onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}