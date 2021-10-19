import axios from 'axios';

const basePath = 'https://api.themoviedb.org/3';
const API_KEY = process.env.THE_MOVIE_DB_API_KEY;

/**
 * function to get movie genres
 */
export async function getMovieGenres() {
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
export async function fetchMovies(category, page, genre, genreId, filter) {
	console.log(genre, genreId)
	const path =
		genre || genreId
			? `${basePath}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&sort_by=${
					filter ? filter : 'popularity.desc'
			  }`
			: `${basePath}/movie/${category}?api_key=${API_KEY}&page=${page}`;
	console.log(path)
	try {
		const { data, status } = await axios.get(path);
		if (status !== 200) throw new Error(`error fetching ${category} movies`);
		return data;
	} catch (error) {
		throw error;
	}
}
