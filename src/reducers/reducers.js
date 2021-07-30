import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, ADD_FAVORITES, REMOVE_FAVORITES } from '../actions/actions';

function visibilityFilter(state = '', action){
    switch (action.type){

        case SET_FILTER:
            return action.value;

        default:
            return state;

    }
}

function movies(state = [], action){
    switch (action.type){

        case SET_MOVIES:
            return action.value;
        
        default:
            return state;

    }
}

function user(state = '', action){

    switch (action.type){
        case SET_USER:
            return action.value;
        default:
            return state;
    }
}



// if combined reducer is not used. take note, return is json obj!
/*function moviesApp(state = {}, action){
    return {
        visibilityFilter : visibilityFilter(state.visibilityFilter, action),
        movies: movies(state.movies, action)
    }
}*/

//short hand - using combineReducers
const moviesApp = combineReducers({
   visibilityFilter,
   movies 
});

export default moviesApp;