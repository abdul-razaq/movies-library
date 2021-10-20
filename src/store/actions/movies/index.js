import { fetchMovies, getMovieGenres } from '../../../api/themoviedb';

export const actionTypes = {
	SET_LOADING: 'SET_LOADING',
	SET_ERROR: 'SET_ERROR',
	GET_MOVIES: 'GET_MOVIES',
	SET_GENRES: 'SET_GENRES',
	SET_GENRES_LOADING: 'SET_GENRES_LOADING',
	SET_GENRES_ERROR: 'SET_GENRES_ERROR',
};

export function getGenres() {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: actionTypes.SET_GENRES_LOADING,
				payload: {
					loading: true,
				},
			});
			const genres = await getMovieGenres();
			dispatch({
				type: actionTypes.SET_GENRES,
				payload: {
					genres,
				},
			});
		} catch {
			dispatch({
				type: actionTypes.SET_GENRES_ERROR,
				payload: {
					error: 'unable to fetch movie genres!',
				},
			});
		} finally {
			dispatch({
				type: actionTypes.SET_GENRES_LOADING,
				payload: {
					loading: false,
				},
			});
		}
	};
}

export function getMovies(category, page, genre, genreId) {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: actionTypes.SET_LOADING,
				payload: {
					loading: true,
				},
			});
			const movies = await fetchMovies(category, page, genre, genreId);
			dispatch({
				type: actionTypes.GET_MOVIES,
				payload: {
					movies,
				},
			});
		} catch (error) {
			dispatch({
				type: actionTypes.SET_ERROR,
				payload: {
					error: `unable to fetch ${category} movies. check internet connection and try again.`,
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
