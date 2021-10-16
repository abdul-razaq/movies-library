import * as Redux from 'redux';

import discoverMoviesReducer from './reducers/movies/discover';

export default Redux.combineReducers({
	discoverMovies: discoverMoviesReducer,
});
