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

export async function getPopularMovies() {
	try {
		const path = `${basePath}/discover/movie?api_key=${API_KEY}&include_adult=true&include_video=true`;
		const { data, status } = await axios.get(path);
		if (status !== 200) throw new Error('error fetching popular movies');
		return data;
	} catch (error) {
		throw error;
	}
}
