import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component{

    render(){
        const { movieData, onMovieClick } = this.props;
        return (
            <div className="movie-card movie-details-container" onClick={() => { onMovieClick(movieData); }}>
                <span className="label">{movieData.title}</span>
            </div>
        );        
    }

}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}