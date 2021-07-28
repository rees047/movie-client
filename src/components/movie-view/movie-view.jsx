import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import {Link} from 'react-router-dom';

import {NavBarView} from '../navbar-view/navbar-view';
import  './movie-view.scss';


export class MovieView extends React.Component{

    keypressCallback(event){
        console.log(event.key);
    }

    componentDidMount(){
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount(){
        document.removeEventListener('keypress', this.keypressCallback);
    }

    handleClick() {
        let accessToken = localStorage.getItem('token');

        if(!accessToken) return
        else {
            this.updateFavoriteMovies(accessToken);
        }
      
    }

    updateFavoriteMovies(token){

        /*Axios.get('https://cinefiles-api.herokuapp.com/movies',{
            headers : { Authorization : 'Bearer ' + token  }
        })*/
        Axios({
            method: 'post',
            url: `http://localhost:8080/users/${this.props.user}/movies/${this.props.movieData.title}`,
            headers: {
              Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if(response.data.success)
                alert('Movie Added!');
        })
        .catch(error => {
            console.log(error);
        });

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
        const {movieData, onBackClick, onLoggedOut, user, userID } = this.props;
               
        return (
            <Col id="movieView">
                <NavBarView onLoggedOut={onLoggedOut} user={user} userID={userID} />
                <br/>
                <Container id="movie-info">
                <Row>
                    <Col className="bg-light">
                        <Row className="details-container">
                            <Col className="details text-center">{movieData.featured ? <h4 className="title">Featured</h4> : <br/>}</Col>
                        </Row>
                        <Row>
                            <Col lg={4}>
                                <Image src={movieData.imagePath} alt={movieData.title} crossOrigin="anonymous" className="poster-img" />
                            </Col>
                            <Col lg={8}>
                                <Row className="details-container">
                                    <Col><h2 className="title">{movieData.title}</h2></Col>
                                </Row>
                                <Row className="details-container">
                                    <Col lg={3}>Release Date:</Col>
                                    <Col className="details">{ this.refineDate(movieData.release)}</Col>
                                </Row>
                                <Row className="details-container">
                                    <Col lg={3}>Runtime:</Col>
                                    <Col className="details">{ movieData.runtime }</Col>
                                </Row>
                                <Row className="details-container">
                                    <Col lg={3}> Cast: </Col>
                                    <Col className="details">{ movieData.cast.map(cast => (
                                        <span>{cast} </span>
                                    ))}
                                    </Col>
                                </Row>
                                <Row className="details-container">
                                    <Col lg={3}> Director: </Col>
                                    <Col className="details">
                                        <Link to={`/directors/${movieData.director.name}`}>{ movieData.director.name }</Link>
                                    </Col>
                                </Row>
                                <Row className="details-container">
                                    <Col lg={3}>Genre:</Col>
                                    <Col className="details"> <Link to={`/genre/${movieData.genre.name}`}>{ movieData.genre.name }</Link></Col>
                                </Row>
                                <Row className="details-container">
                                    <Col lg={3}>Rating:</Col>
                                    <Col className="details">{ movieData.rating.name }</Col>
                                </Row>
                                <Row className="details-container">
                                    <Col lg={3}>Budget:</Col>
                                    <Col className="details">{ movieData.budget }</Col>
                                </Row>
                                <Row className="details-container">
                                    <Col lg={3}>Gross Profit:</Col>
                                    <Col className="details">{ movieData.gross }</Col>
                                </Row>
                                <Row className="details-container">
                                    <Col className="details">{ movieData.description }</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{offset: 3}} className="text-center">
                                <Button variant="flat" onClick={() => { onBackClick(null); }}>Back</Button>
                            </Col><Col className="text-center">
                                <Button variant="flat" onClick={() => this.handleClick()} >Add Movie</Button>
                            </Col>
                        </Row>
                        <br/>
                    </Col>
                </Row>
                </Container>
            </Col>

            
        );
    }

}

/*MovieView.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        budget: PropTypes.string,
        cast: PropTypes.array,
        diretor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string,
            birthdate: PropTypes.string,
            deathdate: PropTypes.string,
        }),
        featured: PropTypes.boolean,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string
        }),
        gross: PropTypes.string,
        imagePath: PropTypes.string,
        rating: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string
        }),
        release: PropTypes.string,
        runtime: PropTypes.string,
        year: PropTypes.string
    }).isRequired
}*/