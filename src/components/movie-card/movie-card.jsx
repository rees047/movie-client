import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {Link} from 'react-router-dom';

export class MovieCard extends React.Component{

    render(){
        const { movieData } = this.props;
       
        return (
            <Col lg={3}>
                <Card>
                    <Card.Img variant="top" src= {movieData.imagePath} crossOrigin="anonymous" height="400"/>
                    <Card.Body>
                        <Card.Title>{movieData.title}</Card.Title>
                        <Card.Text>{movieData.description}</Card.Text>
                        <Link to={`/movies/${movieData.title}`}>
                            <Button variant="link">Open</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        );        
    }

}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string.isRequired
    }).isRequired
}