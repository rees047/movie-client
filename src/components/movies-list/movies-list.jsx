import React from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import { NavBarView } from '../navbar-view/navbar-view';

const mapStatetoProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
}

function MoviesList(props){
   
    const { movieData, visibilityFilter, onLoggedOut, user, userID } = props;
    let filteredMovies = movieData;   

    if (visibilityFilter !== ''){
        filteredMovies = movieData.filter(m => String(m.title).toLowerCase().includes(visibilityFilter));
    }

    if (!movieData) return <div className = "main-view"></div>;

    return (
        

        <Col id="movieCard">
            <NavBarView onLoggedOut={onLoggedOut} user={user} />
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            <Row>
               { filteredMovies.map(m => (
                    <Col lg={3} className="d-flex align-items-normal" key={movieData._id}>
                        <MovieCard movieData={m} />
                    </Col>
               ))}
            </Row>
        </Col>
    )

}

export default connect(mapStatetoProps)(MoviesList);
