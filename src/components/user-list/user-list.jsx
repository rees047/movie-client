import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { setUserData } from '../../actions/actions';
import { UserView } from '../user-view/user-view';
import { NavBarView } from '../navbar-view/navbar-view';

// #7 
let mapStatetoProps = state => {
    return {
        user : state.user,
        userdata :  state.userdata
    }
}

function UserList(props){

    const { onLoggedOut, user } = props;
    console.log(props);
    getUserData(user);    
   
    return (
        

        <Col id="movieCard">
            <NavBarView onLoggedOut={onLoggedOut} user={user} />
        </Col>
    )

}

function getUserData(user){
    let token =  AccessToken();
        
    //console.debug("After mount! Let's load data from API...");
    Axios({
        method: 'get',
        //url: `http://localhost:8080/users/${this.props.user}`,
        url: `https://cinefiles-api.herokuapp.com/users/${user}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {         
        //console.log(response.data); 
        setUserData(response.data);  

        /*this.setState({ isLoading: false });
        this.setState({ f_name: response.data.firstname });
        this.setState({ l_name: response.data.lastname });

        if(response.data.favoredMovies != 0)
            this.setState({ hasFaveMovies: true }); */
    })
    .catch(error => {
        console.log(error);
    });
}

function AccessToken(){
    let accessToken = localStorage.getItem('token');
    return accessToken;
}

export default connect(mapStatetoProps, {setUserData})(UserList);
