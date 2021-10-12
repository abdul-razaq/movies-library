import * as Redux from 'redux';

import moviesReducer from './reducers/movies';

export default Redux.combineReducers({
	movies: moviesReducer,
});
