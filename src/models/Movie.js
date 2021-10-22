export default class Movie {
	constructor(movie) {
		this.id = movie.id;
		this.adult = movie.adult;
		this.backdrop_path = movie.backdrop_path;
		this.genre_ids = movie.genre_ids
			? movie.genre_ids
			: movie.genres.map(({ id }) => id);
		this.original_language = movie.original_language;
		this.original_title = movie.original_title;
		this.original_title = movie.original_title;
		this.overview = movie.overview;
		this.popularity = movie.popularity;
		this.poster_path = movie.poster_path;
		this.release_date = movie.release_date;
		this.title = movie.title;
		this.vote_average = movie.vote_average;
		this.vote_count = movie.vote_count;
	}
}
