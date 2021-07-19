import React from 'react';

export class MovieView extends React.Component{
    render(){
        const {movieData} = this.props;
        return (
            <div className="movie-view">
                <div className="movie-image">
                    <img src={movieData.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title:</span>
                    <span className="value">{movieData.Title}:</span>
                </div>
                <div className="movie-description">
                    <span className="label">Title:</span>
                    <span className="value">{movieData.Description}:</span>
                </div>
            </div>
        );
    }
}