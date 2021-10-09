import axios from 'axios';

const basePath = 'https://api.themoviedb.org/3/';
const API_KEY = process.env.THE_MOVIE_DB_API_KEY;

export async function getMovieGenres() {
	try {
		const { data: { genres }, request } = await axios.get(
			`${basePath}/genre/movie/list?api_key=${API_KEY}`,
		);
		if (request.status !== 200) throw new Error('error fetching genres');
    return genres;
	} catch (error) {
		throw error;
	}
}
