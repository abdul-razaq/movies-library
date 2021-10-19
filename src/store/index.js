import * as Redux from 'redux';

import moviesReducer from './reducers/movies';
import shelfReducer from './reducers/shelf';

export default Redux.combineReducers({
	movies: moviesReducer,
	shelf: shelfReducer,
});
