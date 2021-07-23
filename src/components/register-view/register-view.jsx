import React, { useState } from 'react';
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
        console.log(username, password, firstName, lastName, email, birthDate);    
    };

    return (
        <Row id="register" className="justify-content-md-center">
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
                    <Form.Group controlID = "formGroupFirstName">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type="text" value={firstName} id="firstName" name="firstName" placeholder="John" minLength="2" maxLength="20" onChange={e => setFirstName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlID = "formGroupLastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text" value={lastName} id="lastName" name="lastName" placeholder="Doe" minLength="2" maxLength="20" onChange={e => setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlID = "formGroupEmail">
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control type="email" value={email} id="email" name="lastName" placeholder="jd01@johndoe.com" minLength="5" maxLength="20" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlID = "Birthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="date" value={birthDate} id="birthDate" name="birthDate" placeholder="2021-07-22" min="1900-01-01" max="2022-12-31" onChange={e => setBirthDate(e.target.value)} />
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