import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import {Link} from 'react-router-dom';
import {NavBarView} from '../navbar-view/navbar-view';

import  './user-view.scss';

export class UserView extends React.Component{

    constructor(props) {
        super(props);
        this.state = { isLoading: true, userData: undefined, hasFaveMovies: false, editing: false };
        this.firstname = '';
        this.lastname = '';
    }
    
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        
        //console.debug("After mount! Let's load data from API...");
            /*Axios.get('https://cinefiles-api.herokuapp.com/movies',{
            headers : { Authorization : 'Bearer ' + token  }
        })*/
        Axios({
            method: 'get',
            url: `http://localhost:8080/users/${this.props.user}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => {
            //console.log(response.data);
            this.setState({ userData: response.data });
            this.setState({ isLoading: false });

            if(response.data.favoredMovies != 0)
                this.setState({ hasFaveMovies: true });
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleClick(movie) {
        let accessToken = localStorage.getItem('token');

        if(!accessToken) return
        else {
            this.updateFavoriteMovies(accessToken, movie);
        }
      
    }

    updateFavoriteMovies(token, movie){

        /*Axios.get('https://cinefiles-api.herokuapp.com/movies',{
            headers : { Authorization : 'Bearer ' + token  }
        })*/
        Axios({
            method: 'delete',
            url: `http://localhost:8080/users/${this.state.userData.username}/movies/${movie}`,
            headers: {
              Authorization: `Bearer ${token}`
            }
        }).then(response => {
            this.setState({ userData: response.data });
            this.setState({ isLoading: false });

            if(response.data.favoredMovies != 0)
                this.setState({ hasFaveMovies: true });
           // if(response.data.success)
                //alert('Movie Added!');
        })
        .catch(error => {
            console.log(error);
        });

    }

    DeleteProfile(){
        let token = localStorage.getItem('token');

        Axios({
            method: 'delete',
            url: `http://localhost:8080/users/${this.state.userData.username}`,
            headers: {
              Authorization: `Bearer ${token}`
            }
        }).then(response => {
            alert('Profile Deleted');
            this.props.onLoggedOut();
        })
        .catch(error => {
            console.log(error);
        });
    }

    saveEdit(){
        let token = localStorage.getItem('token');

       console.log(this.firstname);

       
    }

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
        
        const { onLoggedOut, user, userID } = this.props;    
        const { isLoading, userData } = this.state;       

        if (isLoading) {
          return <div className="App">Loading...</div>;
        }

        console.log(userData);

        return (
            <Col id="userView">
                <NavBarView onLoggedOut={onLoggedOut} user={user} userID={userID} />
                <br/>
                <Container id="user-info">
                    <Row>
                        <Col className="bg-light">
                            <Row>                           
                                <Col>
                                    <Row className="details-container">
                                        <Col><h2 className="title">{userData.username}</h2></Col>
                                    </Row>
                                    <Row className="details-container">
                                        <Col lg={4}> First Name:</Col>
                                        <Col className="details">
                                            { this.state.editing ?
                                                userData.firstname
                                            :   (
                                                    <input type="text" defaultValue={userData.firstname} ref={node => { this.firstname = node;  }} />
                                                )
                                            }
                                        </Col>
                                         <Col className="details">
                                            <Button variant="flat" onClick={() => this.saveEdit()} >Save</Button>
                                        </Col>
                                    </Row>
                                    <Row className="details-container">
                                        <Col lg={4}> Last Name </Col>
                                        <Col className="details">{ userData.lastname }</Col>
                                    </Row>
                                    <Row className="details-container">
                                        <Col lg={4}>Email Address:</Col>
                                        <Col className="details">{ userData.email }</Col>
                                    </Row>
                                    <Row className="details-container">
                                        <Col lg={4}> Birthday: </Col>
                                        <Col className="details">{ this.refineDate(userData.birthdate) }</Col>
                                    </Row>
                                    <Row className="details-container">
                                        <Col lg={4}> Favorite Movies: </Col>
                                            { !userData.favoredMovies ? <Col className="details"></Col> : 
                                                <Col className="details">
                                                    { userData.favoredMovies.map(fave => (
                                                        <Row>
                                                            <Col>{fave}</Col>
                                                            <Col className="text-center">
                                                                <Button variant="flat" onClick={() => this.handleClick(fave)} >Remove Movie</Button>
                                                            </Col>
                                                        </Row>
                                                    ))}
                                                </Col>
                                            }
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center"><Button variant="flat" onClick={() => this.DeleteProfile()} >Delete Profile</Button></Col>
                            </Row>
                            <br/>                            
                        </Col>
                    </Row>
                </Container>
            </Col>
        );
    }

}