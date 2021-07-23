import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import  './login-view.scss';


export function LoginView(props){
    
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* 
            Send a request to the server for authentication
            then call this.props.onLoggedIn(username)
        */
        props.onLoggedIn(username);        
    };

    return (
        <Row id="login" className="justify-content-md-center">
            <Col className="border" md={8}>
                <Form>
                    <Form.Group controlID = "formGroupUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} id="username" name="username" placeholder="enter username" minLength="5" maxLength="20" onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlID = "formGroupPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} id="password" id="password" name="password" placeholder="enter password" minLength="5" maxLength="20" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button className="custom-button" type="button" onClick={handleSubmit}>Submit</Button>
                </Form>
                <Row>
                    <Col md={8}>
                        <br/>
                        <Button className="custom-button" type="button" onClick={() => { props.onRegisterClick(true); }}>Register</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

}