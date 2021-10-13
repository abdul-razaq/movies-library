import { actionTypes } from '../../actions/movies';

const initialState = {
	loading: false,
	error: '',
	movies: [],
	page: 1,
  total_pages: 0,
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
			const { page, results, total_pages } = action.payload.movies;
			return {
				...state,
				movies: results,
				page,
				total_pages,
			};
		default:
			return state;
	}
}
