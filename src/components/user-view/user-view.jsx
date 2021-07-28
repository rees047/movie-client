import React from 'react';
import Axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import {NavBarView} from '../navbar-view/navbar-view';

import  './user-view.scss';

export class UserView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userData: undefined,
            hasFaveMovies: false,
            f_name: '',
            l_name: '',
        };
    }
    
    componentDidMount() {
        let token =  this.AccessToken();
        
        //console.debug("After mount! Let's load data from API...");
        Axios({
            method: 'get',
            //url: `http://localhost:8080/users/${this.props.user}`,
            url: `https://cinefiles-api.herokuapp.com/users/${this.props.user}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {            
            //console.log(response.data);
            this.setState({ userData: response.data });
            this.setState({ isLoading: false });
            this.setState({ f_name: response.data.firstname });
            this.setState({ l_name: response.data.lastname });

            if(response.data.favoredMovies != 0)
                this.setState({ hasFaveMovies: true }); 
        })
        .catch(error => {
            console.log(error);
        });
    }

    AccessToken(){
        let accessToken = localStorage.getItem('token');
        return accessToken;
    }

    handleClick(movie) {
        let token =  this.AccessToken();

        if(!token) return
        else {
            this.updateFavoriteMovies(token, movie);
        }
      
    }

    updateFavoriteMovies(token, movie){

        Axios({
            method: 'delete',
            //url: `http://localhost:8080/users/${this.state.userData.username}/movies/${movie}`,
            url: `https://cinefiles-api.herokuapp.com/users/${this.state.userData.username}/movies/${movie}`,
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
    
    updateProfile(){
        let token =  this.AccessToken();
        let fname = this.state.f_name;
        let lname = this.state.l_name;
        
        Axios({
            method: 'put',
            //url: `http://localhost:8080/users/${this.state.userData.username}`,
            url: `https://cinefiles-api.herokuapp.com/users/${this.state.userData.username}`,
            data: {},
            params : {
                firstname : fname,
                lastname: lname,
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
        }).then(response => {
            //console.log(response);
            /*this.setState({ userData: response.data });
            this.setState({ isLoading: false });

            if(response.data.favoredMovies != 0)
                this.setState({ hasFaveMovies: true });*/
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
            //url: `http://localhost:8080/users/${this.state.userData.username}`,
            url: `https://cinefiles-api.herokuapp.com/users/${this.state.userData.username}`,
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
        const { isLoading, userData, f_name, l_name } = this.state;       

        if (isLoading) {
          return <div className="App">Loading...</div>;
        }

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
                                    <Form>
                                        <Form.Group controlId = "formGroupFirstName" as={Row}>
                                            <Col lg={4}><Form.Label>First Name:</Form.Label></Col>
                                            <Col lg={4}>
                                                <Form.Control type="text" defaultValue={userData.firstname} name="firstname" placeholder="John" minLength="5" maxLength="20" onChange={(e) => this.setState({f_name: e.target.value})}  />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group controlId = "formGroupLastName" as={Row}>
                                            <Col lg={4}><Form.Label>Last Name:</Form.Label></Col>
                                            <Col lg={4}>
                                                <Form.Control type="text" defaultValue={userData.lastname} name="lastname" placeholder="Doe" minLength="5" maxLength="20" onChange={(e) => this.setState({l_name: e.target.value})}  />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                    <Row className="details-container">
                                        <Col offset={4} className="text-center">
                                            <Button variant="flat" onClick={() => this.updateProfile()} > Update Profile</Button>
                                        </Col>
                                    </Row>
                                    <br/>
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