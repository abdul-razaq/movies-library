import React from 'react';
import { useParams } from 'react-router-dom';

import { getPopularMovies } from '../../api/themoviedb';

export default function DiscoverScreen({}) {
	const { category } = useParams();

	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	
	React.useEffect(() => {
		
	}, []);

	return <h1>DISCOVER SCREEN - Showing list of {category} movies</h1>;
}
