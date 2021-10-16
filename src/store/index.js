import * as Redux from 'redux';

import discoverMoviesReducer from './reducers/movies/discover';
import shelfReducer from './reducers/shelf';

export default Redux.combineReducers({
	discoverMovies: discoverMoviesReducer,
	shelf: shelfReducer,
});
