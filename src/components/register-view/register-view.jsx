import React, { useState } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { Link } from 'react-router-dom';

import  './register-view.scss';
import logo from '../../images/cinema-pink.png';


export function RegisterView(props){
   
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthDate, setBirthDate ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //Send a request to the server for authentication
        //Axios.post('https://cinefiles-api.herokuapp.com/users', {
            Axios.post('http://localhost:8080/users', {
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
                email: email,
                birthdate: birthdate
            }).then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self'); //the second argument '_self' is necessary so that the page will open in the current tab
            }).catch (e => {
                console.log('error registering the user');
            });
    
            //console.log(username, password);
        
    };

    return (
        <Col id="register" md={8}>
            <Row className="align-items-center has-height-600">
                <Col fluid="true">
                    <Row>
                        <Col className="text-center">
                            <Image src={logo} rounded alt="Cinema-Files-Logo" className="logo-image" />
                        </Col>
                    </Row>
                    <Form>
                    <Row>
                        <Form.Group controlId = "formGroupUsername" as={Col}>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" value={username} name="username" placeholder="enter username" minLength="5" maxLength="20" onChange={e => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId = "formGroupPassword" as={Col}>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" value={password} name="password" placeholder="enter password" minLength="5" maxLength="20" onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId = "formGroupFirstName" as={Col}>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control type="text" value={firstName} name="firstName" placeholder="John" minLength="2" maxLength="20" onChange={e => setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId = "formGroupLastName" as={Col}>
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type="text" value={lastName} name="lastName" placeholder="Doe" minLength="2" maxLength="20" onChange={e => setLastName(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId = "formGroupEmail" as={Col}>
                            <Form.Label>Email Address:</Form.Label>
                            <Form.Control type="email" value={email} name="lastName" placeholder="jd01@johndoe.com" minLength="5" maxLength="20" onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId = "Birthdate" as={Col}>
                            <Form.Label>Birthdate:</Form.Label>
                            <Form.Control type="date" value={birthDate} name="birthDate" placeholder="2021-07-22" min="1900-01-01" max="2022-12-31" onChange={e => setBirthDate(e.target.value)} />
                        </Form.Group>
                    </Row>
                    </Form>
                    <Row>
                        <Col>
                            <Link to="/">
                                <Button variant="link" className="btn-flat">Home</Button>
                            </Link>
                        </Col>
                        <Col className="text-right">
                            <Button variant="flat" onClick={handleSubmit}>Submit</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
    );

}

RegisterView.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string //birthday as props
}