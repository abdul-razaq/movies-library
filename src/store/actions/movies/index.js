import { getPopularMovies } from '../../../api/themoviedb';

export const actionTypes = {
	GET_POPULAR_MOVIES: 'GET_POPULAR_MOVIES',
	SET_ERROR: 'SET_ERROR',
};

function fetchPopularMovies() {
	return async function (dispatch, getState) {
		try {
			const popularMovies = await getPopularMovies();
			dispatch({
				type: actionTypes.GET_POPULAR_MOVIES,
				payload: {
					movies: popularMovies,
				},
			});
		} catch (error) {
			dispatch({
				type: actionTypes.SET_ERROR,
				payload: {
					error: error.message,
				},
			});
		}
	};
}

export default {
	fetchPopularMovies,
};
