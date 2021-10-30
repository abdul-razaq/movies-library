import { actionTypes } from '../../actions/movie';

const initialState = {
	loading: true,
	error: '',
	movieDetails: {},
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
				movieDetails: action.payload.movie,
			};
		case actionTypes.CLEAR_MOVIE_DETAILS:
			return {
				...state,
				movieDetails: {},
			};
		default:
			return state;
	}
}
