import React from 'react';
import Axios from 'axios';

import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// #0
import { setMovies, setUser, setUserData} from '../../actions/actions';
// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';
/*
#1 The rest of the components import statements but without the MovieCard's because it will be imported and sed in the MoviesList component rather than in here
*/

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';

import {LoginView} from '../login-view/login-view';
import {RegisterView} from '../register-view/register-view';
//import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {UserView} from '../user-view/user-view';
//import UserList from '../user-list/user-list';

import  './main-view.scss';

// #2 export keyword removed from here
class MainView extends React.Component{

    constructor(){
        super();
        this.onLoggedOut = this.onLoggedOut.bind(this);

        // #3 movies state removed from here        
    }    

    componentDidMount(){              
        let accessToken = localStorage.getItem('token');

        if(accessToken !==null){
            this.props.setUser(localStorage.getItem("user"));
            this.getMovies(accessToken);
        }else{
            this.props.setUser(null);
        }
    }

    /* when a user successfully logs in, this function updates the 'user' property in state to that *particular* user */
    onLoggedIn(authData){
        //console.log(authData);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        localStorage.setItem('uid', authData.user._id);
        this.props.setUser(authData.user.username);
        this.getMovies(authData.token)
    }

    onLoggedOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('uid');
        this.props.setUser(null);
    }

    render(){

        //#5 movies is extractd from this.props rather than from the this.state
        let { movies, user } = this.props;
            
        return (
            <Router>
                <Row className="main-view justify-content-md-center">

                <Switch>
               
                        <Route path="/register" render = {() => {
                            if(user) return <Redirect to="/" />
                            return <RegisterView />
                        }} />

                        <Route path="/users/:username" render = {({ match, history }) => {
                            if(!user) return <Redirect to="/" />
                            return <UserView onBackClick={() => history.goBack()} onLoggedOut={this.onLoggedOut} user={user} />
                        }} /> 

                        <Route path="/directors/:director" render = {({ match, history }) => {
                            if(!user) return <Redirect to="/" />
                            return <DirectorView movieData={movies.find(movie => movie.director.name === match.params.director)} onBackClick={() => history.goBack()} onLoggedOut={this.onLoggedOut} user={user} />
                        }} /> 

                        <Route path="/genre/:genre" render = {({ match, history }) => {
                            if(!user) return <Redirect to="/" />
                            return <GenreView movieData={movies.find(movie => movie.genre.name === match.params.genre)} onBackClick={() => history.goBack()} onLoggedOut={this.onLoggedOut} user={user} />
                        }} /> 

                        <Route path="/movies/:title" render = {({ match, history }) => {
                            if(!user) return <Redirect to="/" />
                            return <MovieView movieData={movies.find(movie => movie.title === match.params.title)} onBackClick={() => history.goBack()} onLoggedOut={this.onLoggedOut} user={user} />
                        }} /> 

                        <Route path="/movies" render ={() => {
                            if(!user) return <Redirect to="/" />
                            if (movies.length === 0) return <Col md={8}><p>No Movies Found!</p></Col>
                            //return <MovieCard movieData={movies} onLoggedOut={this.onLoggedOut} user={user} />
                            return <MoviesList movieData={movies} onLoggedOut={this.onLoggedOut} user={user} />
                        }} />

                        <Route exact path="/" render = {() => {
                            if (user) return <Redirect to="/movies" />
                            return <LoginView onLoggedIn={newUser => this.onLoggedIn(newUser)} />
                        }} />
                    </Switch>
                </Row>
                
            </Router>            
        );  
    }  
    
    getMovies(token){

        Axios.get('https://cinefiles-api.herokuapp.com/movies',{
            headers : { Authorization : 'Bearer ' + token  }
        })
        /*Axios.get('http://localhost:8080/movies', {
            headers : { Authorization : `Bearer ${token}`  }
        })*/
        .then(response => {
            
            let movieData = response.data;
            let imageSRC = 'https://cinefiles-api.herokuapp.com/'
            //let imageSRC = 'http://localhost:8080';        

            movieData.map((movie) => {
                movie.imagePath = imageSRC + movie.imagePath;
            });

            //console.log(response.data);
            //console.log(movieData); //after modified image path
            
            //replaced by redux set Movies
            /*this.setState({
                movies: response.data
            });*/

            // #4
            this.props.setMovies(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    }

}

// #7 
let mapStatetoProps = state => {
    return {
        movies : state.movies,
        user : state.user,
        userdata :  state.userdata
    }
}

export default connect(mapStatetoProps, { setMovies, setUser, setUserData })(MainView);