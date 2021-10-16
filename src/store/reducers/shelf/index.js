import { actionTypes } from '../../actions/shelf';

const initialState = {
	favoriteMovies: [],
	moviesWatching: [],
};

export default function shelfReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_SHELF_MOVIES:
			const { favoriteMovies, moviesWatching } = action.payload;
			return {
				favoriteMovies,
				moviesWatching,
			};
		default:
			return state;
	}
}
