import { actionTypes } from '../../actions/movies';

const initialState = {
	loading: true,
	error: '',
	movies: [],
	currentPage: 1,
	initialPage: 1,
	nextPage: 0,
	totalPages: 0,
	genres: [],
	genresLoading: false,
	genresError: '',
};

export default function moviesReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_MOVIES_LOADING:
			return {
				...state,
				loading: true,
			};
		case actionTypes.UNSET_MOVIES_LOADING:
			return {
				...state,
				loading: false,
			};
		case actionTypes.SET_MOVIES_ERROR:
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
		case actionTypes.SET_GENRES:
			const { genres } = action.payload;
			return {
				...state,
				genres,
			};
		case actionTypes.SET_GENRES_LOADING:
			return {
				...state,
				genresLoading: true,
			};
		case actionTypes.UNSET_GENRES_LOADING:
			return {
				...state,
				genresLoading: false,
			};
		case actionTypes.SET_GENRES_ERROR:
			return {
				...state,
				genresError: action.payload.error,
			};
		default:
			return state;
	}
}
