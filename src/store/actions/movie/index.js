import { fetchMovie, fetchRecommendedMovies } from '../../../api/themoviedb';

export const actionTypes = {
	SET_MOVIE_LOADING: 'SET_MOVIE_LOADING',
	UNSET_MOVIE_LOADING: 'UNSET_MOVIE_LOADING',
	FETCH_MOVIE: 'FETCH_MOVIE',
	SET_MOVIE_ERROR: 'SET_MOVIE_ERROR',
};

export function getMovie(movieId) {
	return async function (dispatch, getState) {
		try {
			dispatch({ type: actionTypes.SET_MOVIE_LOADING });
			const movie = await fetchMovie(movieId);
			dispatch({
				type: actionTypes.FETCH_MOVIE,
				payload: {
					movie,
				},
			});
		} catch (error) {
			console.error('[fetchMovie] => ', error);
			dispatch({ type: actionTypes.SET_MOVIE_ERROR, payload: { error } });
		} finally {
			dispatch({ type: actionTypes.UNSET_MOVIE_LOADING });
		}
	};
}

export function getRecommendedMovies(movieId) {
	return async function (dispatch, getState) {
		return {
			type: actionTypes.FETCH_MOVIE,
		};
	};
}
