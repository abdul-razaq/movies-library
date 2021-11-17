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
 * function to fetch movies
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
		? `${basePath}/search/movie/?api_key=${API_KEY}&query=${query}&page=${page}/`
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

/**
 * fetch a movie details by id
 * @param {movieId} movieId id of the movie to fetch details for.
 * @returns object
 */
export async function fetchMovie(movieId) {
	const path = `${basePath}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos,recommendations`;
	try {
		const { data, status } = await axios.get(path);
		if (status !== 200) throw new Error('unable to fetch movie details.');
		return data;
	} catch (error) {
		throw error;
	}
}

export async function fetchRecommendedMovies(movieId, page) {
	try {
		const path = `${basePath}/movie/${movieId}/recommendations?api_key=${API_KEY}&page=${page}`;
		const { data, status } = await axios.get(path);
		if (status !== 200) throw new Error('unable to fetch recommended movies.');
		return data;
	} catch (error) {
		throw error;
	}
}

/**
 * fetch a cast details
 * @param {string} castId cast to fetch
 * @returns cast details
 */
export async function fetchCastDetails(castId) {
	try {
		const path = `${basePath}/person/${castId}?api_key=${API_KEY}&append_to_response=movie_credits`;
		const { data, status } = await axios.get(path);
		if (status !== 200) throw new Error('unable to fetch cast details');
		return data;
	} catch (error) {
		throw error;
	}
}
