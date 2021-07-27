import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import {Link} from 'react-router-dom';

import {NavBarView} from '../navbar-view/navbar-view';



export class MovieCard extends React.Component{

    truncate (str) {
        return str.length > 100 ? str.substring(0, 100) + "..." : str;
    }

    render(){
        const { movieData, onLoggedOut, userName, userID } = this.props;

        //convert your array to a matrix as per your need
        const movieRows = movieData.reduce(function (rows, key, index) { 
            return (index % 4 == 0 ? rows.push([key]) 
              : rows[rows.length-1].push(key)) && rows;
          }, []);
          
        //console.log(movieRows)

        
       
        return (
            <Col id="movieCard">
                    <NavBarView />
                    { movieRows.map(movieRow => (
                    <Row>
                        { movieRow.map(movieColData => (
                            <Col lg={3} className="d-flex align-items-normal" key={movieColData._id}>
                                <Card>
                                    <Card.Header className="text-center font-weight-bold">{movieColData.featured ? "Featured" : <br/>}</Card.Header>
                                    <Card.Img variant="top" src= {movieColData.imagePath} crossOrigin="anonymous"/>
                                    <Card.Body>
                                        <Card.Title>{movieColData.title}</Card.Title>
                                        <Card.Text>{this.truncate(movieColData.description)}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-center">
                                        <Link to={`/movies/${movieColData.title}`}>
                                            <Button variant="link" className="btn-flat">Open</Button>
                                        </Link>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ))} 
                <Row>
                    <Col>
                        <Link to="/">
                            <Button variant="link" className="btn-flat" onClick={() => {onLoggedOut()}}>Logout</Button>
                        </Link>
                    </Col>
                </Row>   
            </Col>
        );        
    }

}

/*MovieCard.propTypes = {
    movieData: PropTypes.shape({
      movies: PropTypes.arrayOf(PropTypes.string)
    })
};*/