import { actionTypes } from '../../actions/movie';

const initialState = {
	loading: true,
	error: '',
	movie: {},
};

export default function movieReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_MOVIE_LOADING:
			return {
				...state,
				loading: true,
			};
		case actionTypes.UNSET_MOVIE_LOADING:
			return {
				...state,
				loading: false,
			};
		case actionTypes.SET_MOVIE_ERROR:
			return {
				...state,
				error: action.payload.error,
			};
		case actionTypes.FETCH_MOVIE:
			return {
				...state,
				movie: action.payload.movie,
			};
		default:
			return state;
	}
}
