import * as Redux from 'redux';

import discoverMoviesReducer from './reducers/discover';

export default Redux.combineReducers({
	discoverMovies: discoverMoviesReducer,
});
