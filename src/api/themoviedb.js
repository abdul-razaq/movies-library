import axios from 'axios';

const basePath = 'https://api.themoviedb.org/3';
const API_KEY = process.env.THE_MOVIE_DB_API_KEY;

/**
 * function to get movie genres
 */
export async function fetchGenres() {
	try {
		const {
			data: { genres },
			request,
		} = await axios.get(`${basePath}/genre/movie/list?api_key=${API_KEY}`);
		if (request.status !== 200) throw new Error('error fetching genres');
		return genres;
	} catch (error) {
		throw error;
	}
}

/**
 * function to get discover movies
 */
export async function fetchMovies(
	category,
	page,
	genre,
	genreId,
	query,
	filter,
) {
	const path = query
		? `${basePath}/search/movie/?api_key=${API_KEY}&query=${query}&page=${page}`
		: genre || genreId
		? `${basePath}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&sort_by=${
				filter ? filter : 'popularity.desc'
		  }`
		: `${basePath}/movie/${category}?api_key=${API_KEY}&page=${page}`;
	try {
		const { data, status } = await axios.get(path);
		if (status !== 200)
			throw new Error(`error fetching ${category || genre || query} movies`);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function fetchMovie(movieId) {
	return movieId;
}

export async function fetchRecommendedMovies(movieId) {
	return;
}
