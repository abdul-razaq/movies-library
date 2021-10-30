import { fetchMovie, fetchRecommendedMovies } from '../../../api/themoviedb';
import { actionTypes as moviesActionsTypes } from '../movies';

export const actionTypes = {
	SET_MOVIE_LOADING: 'SET_MOVIE_LOADING',
	UNSET_MOVIE_LOADING: 'UNSET_MOVIE_LOADING',
	FETCH_MOVIE: 'FETCH_MOVIE',
	SET_MOVIE_ERROR: 'SET_MOVIE_ERROR',
	CLEAR_MOVIE_DETAILS: 'CLEAR_MOVIE_DETAILS',
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
			dispatch({
				type: moviesActionsTypes.GET_MOVIES,
				payload: { movies: movie.recommendations },
			});
		} catch (error) {
			dispatch({ type: actionTypes.SET_MOVIE_ERROR, payload: { error } });
		} finally {
			dispatch({ type: actionTypes.UNSET_MOVIE_LOADING });
		}
	};
}

export function getRecommendedMovies(movieId, page) {
	return async function (dispatch, getState) {
		try {
			dispatch({ type: moviesActionsTypes.SET_MOVIES_LOADING });
			const movies = await fetchRecommendedMovies(movieId, page);
			dispatch({ type: moviesActionsTypes.GET_MOVIES, payload: { movies } });
		} catch (error) {
			dispatch({
				type: moviesActionsTypes.SET_MOVIES_ERROR,
				payload: { error },
			});
		} finally {
			dispatch({ type: moviesActionsTypes.UNSET_MOVIES_LOADING });
		}
	};
}
