export const actionTypes = {
	GET_SHELF_MOVIES: 'GET_SHELF_MOVIES',
	ADD_MOVIE_TO_SHELF: 'ADD_MOVIE_TO_SHELF',
	REMOVE_MOVIE_FROM_SHELF: 'REMOVE_MOVIE_FROM_SHELF',
};

export function getShelfMovies() {
	const shelf = window.localStorage.getItem('shelf');
	if (!shelf) {
		window.localStorage.setItem(
			'shelf',
			JSON.stringify({ favorites: [], watching: [] }),
		);
		return {
			type: actionTypes.GET_SHELF_MOVIES,
			payload: {
				favorites: [],
				watching: [],
			},
		};
	}
	const { favorites, watching } = JSON.parse(shelf);
	return {
		type: actionTypes.GET_SHELF_MOVIES,
		payload: {
			favorites,
			watching,
		},
	};
}

export function toggleMovieInShelf(movie, shelfType) {
	const shelf = JSON.parse(window.localStorage.getItem('shelf'));

	let currentShelf = shelf[shelfType];

	if (shelf && !currentShelf.some(({ id }) => id === movie.id)) {
		currentShelf.unshift(movie);
		window.localStorage.setItem(
			'shelf',
			JSON.stringify({ ...shelf, [shelfType]: currentShelf }),
		);
		return {
			type: actionTypes.ADD_MOVIE_TO_SHELF,
			payload: {
				shelfType,
				[shelfType]: currentShelf,
			},
		};
	} else {
		currentShelf = currentShelf.filter(({ id }) => id !== movie.id);
		window.localStorage.setItem(
			'shelf',
			JSON.stringify({
				...shelf,
				[shelfType]: currentShelf,
			}),
		);
		return {
			type: actionTypes.REMOVE_MOVIE_FROM_SHELF,
			payload: {
				shelfType,
				[shelfType]: currentShelf,
			},
		};
	}
}
