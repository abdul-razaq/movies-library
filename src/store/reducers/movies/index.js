import { actionTypes } from '../../actions/movies';

const initialState = {
	loading: false,
	error: '',
	movies: [],
};

export default function moviesReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_LOADING:
			return {
				...state,
				loading: action.payload.loading,
			};
		case actionTypes.SET_ERROR:
			return {
				...state,
				error: action.payload.error,
			};
		case actionTypes.GET_POPULAR_MOVIES:
			return {
				...state,
				movies: action.payload.movies,
			};
		default:
			return state;
	}
}
