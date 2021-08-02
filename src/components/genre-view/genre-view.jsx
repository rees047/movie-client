import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import {Link} from 'react-router-dom';
import {NavBarView} from '../navbar-view/navbar-view';

import  './genre-view.scss';


export class GenreView extends React.Component{

    render(){
        const {movieData, onBackClick, onLoggedOut, user } = this.props;        
       
        return (
            <Col id="genreView">
                <NavBarView onLoggedOut={onLoggedOut} user={user} />
                <br/>
                <Container id="director-info">
                    <Row>
                        <Col className="bg-light">                      
                            <Row>                           
                                <Col>
                                    <Row className="details-container">
                                        <Col><h2 className="title">{movieData.genre.name}</h2></Col>
                                    </Row>
                                    <Row className="details-container">
                                        <Col lg={3}>Description:</Col>
                                        <Col className="details">{ movieData.genre.description }</Col>
                                    </Row>
                                    <Row className="details-container">
                                        <Col lg={3}> Movies: </Col>
                                        <Col className="details">{ movieData.title }</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <Button variant="flat" onClick={() => { onBackClick(null); }}>Back</Button>
                                </Col>
                            </Row>
                            <br/>
                        </Col>
                    </Row>
                </Container>
            </Col>            
        );
    }

}
