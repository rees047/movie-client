import React from 'react';

export class MovieCard extends React.Component{
    render(){
        const { movieData, onMovieClick } = this.props;
        return (
            <div className="movie-card movie-details-container" onClick={() => { onMovieClick(movieData); }}>
                <span class="label">{movieData.Title}</span>
            </div>
        );        
    }
}



