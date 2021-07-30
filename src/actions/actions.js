export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

export const SET_USER = 'SET_USER';
export const ADD_FAVORITES = 'ADD_FAVORITES';
export const REMOVE_FAVORITES = 'REMOVE_FAVORITES';

export function setMovies(value){
    return { type: SET_MOVIES, value };
}

export function setFilter(value){
    return { type: SET_FILTER, value };
}

export function setUser(value){
    return { type: SET_USER, value }
}

export function addFavorites(value){
    return { type: ADD_FAVORITES, value }
}

export function removeFavorites(value){
    return { type: REMOVE_FAVORITES, value }
}

