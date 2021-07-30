import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {Link} from 'react-router-dom';

import  './movie-card.scss';

export class MovieCard extends React.Component{

    truncate (str) {
        return str.length > 100 ? str.substring(0, 100) + "..." : str;
    }

    render(){
        
        /*const checkAccess = () => {
            let accessToken = localStorage.getItem('token');

            if(accessToken == null){
                console.log('here');
                onLoggedOut();
                return <Redirect to="/" />
            }else{
                return null;
            }            
        }*/

        //console.log(user);
       
        const { movieData } = this.props;
       
        return (
            <Card>
                <Card.Header className="text-center font-weight-bold">{movieData.featured ? "Featured" : <br/>}</Card.Header>
                <Card.Img variant="top" src= {movieData.imagePath} crossOrigin="anonymous"/>
                <Card.Body>
                    <Card.Title>{movieData.title}</Card.Title>
                    <Card.Text>{this.truncate(movieData.description)}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                    <Link to={`/movies/${movieData.title}`}>
                        <Button variant="link" className="btn-flat">Open</Button>
                    </Link>
                </Card.Footer>
            </Card>
        );        
    }

}

/*MovieCard.propTypes = {
    movieData: PropTypes.shape({
      movies: PropTypes.arrayOf(PropTypes.string)
    })
};*/