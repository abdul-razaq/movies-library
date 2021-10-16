export const actionTypes = {
	GET_SHELF_MOVIES: 'GET_SHELF_MOVIES',
};

export function getShelfMovies() {
	const shelf = window.localStorage.getItem('shelf');
	if (!shelf) {
		window.localStorage.setItem(
			'shelf',
			JSON.stringify({ favoriteMovies: [], moviesWatching: [] }),
		);
		return {
			type: actionTypes.GET_SHELF_MOVIES,
			payload: {
				favoriteMovies: [],
				moviesWatching: [],
			},
		};
	}
	const { favoriteMovies, moviesWatching } = JSON.parse(shelf);
	return {
		type: actionTypes.GET_SHELF_MOVIES,
		payload: {
			favoriteMovies,
			moviesWatching,
		},
	};
}
