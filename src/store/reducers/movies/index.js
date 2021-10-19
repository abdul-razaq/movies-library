import { actionTypes } from '../../actions/movies';

const initialState = {
	loading: false,
	error: '',
	movies: [],
	currentPage: 1,
	initialPage: 1,
	nextPage: 0,
	totalPages: 0,
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
		case actionTypes.GET_MOVIES:
			const { page, results, total_pages } = action.payload.movies;
			return {
				...state,
				movies: results,
				currentPage: page,
				nextPage: page >= total_pages ? 1 : page + 1,
				totalPages: total_pages,
			};
		default:
			return state;
	}
}
