import { getPopularMovies } from '../../../api/themoviedb';

export const actionTypes = {
	SET_LOADING: 'SET_LOADING',
	SET_ERROR: 'SET_ERROR',
	GET_POPULAR_MOVIES: 'GET_POPULAR_MOVIES',
};
// Use this format to declare actions: movieActions.discoverMovies(category).
export default function fetchPopularMovies(category) {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: actionTypes.SET_LOADING,
				payload: {
					loading: true,
				},
			});
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
					error: `unable to fetch ${category ? category : 'popular'} movies. check internet connection and try again.`,
				},
			});
		} finally {
			dispatch({
				type: actionTypes.SET_LOADING,
				payload: {
					loading: false,
				},
			});
		}
	};
}
