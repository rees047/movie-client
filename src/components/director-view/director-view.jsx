import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import {Link} from 'react-router-dom';

import {NavBarView} from '../navbar-view/navbar-view';
import  './director-view.scss';


export class DirectorView extends React.Component{

    truncate (str) {
        return str.length > 100 ? str.substring(0, 100) + "..." : str;
    }

    refineDate(longDate){

        let date = new Date(longDate);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

        if (dt < 10) {
            dt = '0' + dt;
        }

        /*if (month < 10) {
            month = '0' + month;
        }*/

        return dt + ' ' + monthNames[month] + ' ' + year;
        //console.log(year+'-' + month + '-'+dt);
    }    

    render(){
        const {movieData, onBackClick, onLoggedOut, user } = this.props;        
       
        return (
            <Col id="directorView">
                <NavBarView onLoggedOut={onLoggedOut} user={user} />
                <br/>
                <Container id="director-info">
                    <Row>
                        <Col className="bg-light">                      
                            <Row>                           
                                <Col>
                                    <Row className="details-container">
                                        <Col><h2 className="title">{movieData.director.name}</h2></Col>
                                    </Row>
                                    <Row className="details-container">
                                        <Col lg={3}>Birthdate:</Col>
                                        <Col className="details">{ this.refineDate(movieData.director.birthdate)}</Col>
                                    </Row>
                                    <Row className="details-container">
                                        <Col lg={3}>Biography:</Col>
                                        <Col className="details">{ movieData.director.bio }</Col>
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
