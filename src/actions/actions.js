/*
* action types - determines the switch cases in reducers and functions in stores
*/
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

export const SET_USER = 'SET_USER';
export const SET_USER_DATA = 'SET_USER_DATA';

/*
* action creators
*/

export function setMovies(value){
    return { type: SET_MOVIES, value };
}

export function setFilter(value){
    return { type: SET_FILTER, value };
}

export function setUser(value){
    return { type: SET_USER, value }
}

export function setUserData(value){
    return { type: SET_USER_DATA, value }
}


