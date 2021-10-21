import * as Redux from 'redux';

import moviesReducer from './reducers/movies';
import movieReducer from './reducers/movie';
import shelfReducer from './reducers/shelf';

export default Redux.combineReducers({
	movies: moviesReducer,
	movieDetails: movieReducer,
	shelf: shelfReducer,
});
