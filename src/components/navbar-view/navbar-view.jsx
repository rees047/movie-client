import React from 'react';
import {Link} from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

//import  './navbar-view.scss';
import logo from '../../images/cinema-pink.png';

export class NavBarView extends React.Component{
    
    render(){

        const { onLoggedOut, user } = this.props;

        return(
            <Navbar bg="light" id="CineFiles-Navbar">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} alt="CineFiles" className="d-inline-block align-middle" width="55" height="55" />
                        {' '} CineFiles
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            <Navbar.Text>
                                Hello, <Link to={`/users/${user}`}>{ user }</Link>
                            </Navbar.Text>
                            <Link to="/">
                                <Button variant="link" className="btn-flat" onClick={() => {onLoggedOut()}}>Logout</Button>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>                    
                </Container>
            </Navbar>
        )
    }

}

          