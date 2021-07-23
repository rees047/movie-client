import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component{

    render(){
        const { movieData, onMovieClick } = this.props;
        return (
            <Card>
                <Card.Img variant="top" src={movieData.imagePath} />
                <Card.Body>
                    <Card.Title>{movieData.title}</Card.Title>
                    <Card.Text>{movieData.description}</Card.Text>
                    <Button onClick={() => onMovieClick(movieData)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        );        
    }

}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}