import React, { useState } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import  './register-view.scss';


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
        <Row id="register" className="justify-content-md-center">
            <Col className="border" md={8}>
                <Form>
                    <Form.Group controlId = "formGroupUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} name="username" placeholder="enter username" minLength="5" maxLength="20" onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId = "formGroupPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} name="password" placeholder="enter password" minLength="5" maxLength="20" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId = "formGroupFirstName">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type="text" value={firstName} name="firstName" placeholder="John" minLength="2" maxLength="20" onChange={e => setFirstName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId = "formGroupLastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text" value={lastName} name="lastName" placeholder="Doe" minLength="2" maxLength="20" onChange={e => setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId = "formGroupEmail">
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control type="email" value={email} name="lastName" placeholder="jd01@johndoe.com" minLength="5" maxLength="20" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId = "Birthdate">
                        <Form.Label>Birthdate:</Form.Label>
                        <Form.Control type="date" value={birthDate} name="birthDate" placeholder="2021-07-22" min="1900-01-01" max="2022-12-31" onChange={e => setBirthDate(e.target.value)} />
                    </Form.Group>
                    <Button className="custom-button" type="button" onClick={handleSubmit}>Submit</Button>
                </Form>
                <Row>
                    <Col md={8}>
                        <br/>
                        <Button className="custom-button" type="button" onClick={() => { props.onBackClick(false); }}>Back</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

}

RegisterView.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    birthdate: PropTypes.date,
}