import { fetchMovies, getMovieGenres } from '../../../api/themoviedb';

export const actionTypes = {
	SET_MOVIES_LOADING: 'SET_MOVIES_LOADING',
	UNSET_MOVIES_LOADING: 'UNSET_MOVIES_LOADING',
	SET_ERROR: 'SET_ERROR',
	GET_MOVIES: 'GET_MOVIES',
	SET_GENRES: 'SET_GENRES',
	SET_GENRES_LOADING: 'SET_GENRES_LOADING',
	UNSET_GENRES_LOADING: 'UNSET_GENRES_LOADING',
	SET_GENRES_ERROR: 'SET_GENRES_ERROR',
};

export function getGenres() {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: actionTypes.SET_GENRES_LOADING,
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
				type: actionTypes.UNSET_GENRES_LOADING,
			});
		}
	};
}

export function getMovies(category, page, genre, genreId, query) {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: actionTypes.SET_MOVIES_LOADING,
			});
			const movies = await fetchMovies(category, page, genre, genreId, query);
			dispatch({
				type: actionTypes.GET_MOVIES,
				payload: {
					movies,
				},
			});
		} catch (error) {
			dispatch({
				type: actionTypes.SET_MOVIES_ERROR,
				payload: {
					error: query
						? `Cannot find ${query}.`
						: `unable to fetch ${
								category || genre
						  } movies. check internet connection and try again.`,
				},
			});
		} finally {
			dispatch({
				type: actionTypes.UNSET_MOVIES_LOADING,
			});
		}
	};
}
