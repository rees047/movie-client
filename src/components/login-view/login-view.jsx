import React, { useState } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import  './login-view.scss';
import logo from '../../images/cinema-pink.png';

export function LoginView(props){

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [errMsg, setErrMsg] = useState();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrMsg('');  

        if(!username || !password){
            setErrMsg('Missing Credentials');
        }else{
            //Send a request to the server for authentication
            Axios.post('https://cinefiles-api.herokuapp.com/login', {
            //Axios.post('http://localhost:8080/login', {
                username: username,
                password: password
            }).then(response => {
                const data = response.data;
                props.onLoggedIn(data);  
            }).catch (e => {
                setErrMsg(e.response.data.message.message);
                //console.log('no such user');
            });
        }
    
        //console.log(username, password);
    };

    return (
       
        <Col id="login" md={8}>
            <Row className="align-items-center has-height-600">
                <Col fluid="true">
                    <Row>
                        <Col lg={6}>
                            <Image src={logo} rounded alt="Cinema-Files-Logo" className="logo-image" />
                        </Col>
                        <Col lg={6}>
                            <Row>
                                <Col>
                                    <h2 className="text-center">CineFiles</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="error-msg">&nbsp; {errMsg}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form>
                                        <Form.Group controlId = "formGroupUsername">
                                            <Form.Label>Username:</Form.Label>
                                            <Form.Control type="text" value={username} name="username" required placeholder="enter username" minLength="5" maxLength="20" onChange={e => setUsername(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group controlId = "formGroupPassword">
                                            <Form.Label>Password:</Form.Label>
                                            <Form.Control type="password" value={password} name="password" required placeholder="enter password" minLength="5" maxLength="20" onChange={e => setPassword(e.target.value)} />
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Button variant="flat" onClick={handleSubmit}>Submit</Button>
                                </Col>
                                <Col md={6} className="text-right">
                                    <Link to="/register">
                                        <Button variant="link" className="btn-flat">Register</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
   
    );
}

LoginView.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string
}