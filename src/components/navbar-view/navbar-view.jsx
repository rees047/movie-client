import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

//import  './navbar-view.scss';
import logo from '../../images/cinema-pink.png';

export class NavBarView extends React.Component{
    
    render(){

        const { user, userID } = this.props;

        //console.log(userID);

        return(
            <Navbar>
                <Container>
                <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
                </Navbar.Collapse>
                </Container>
                </Navbar>
        )
    }

}

          