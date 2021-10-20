import React from 'react';
import { useLocation } from 'react-router-dom';

import { BounceLoader } from 'react-spinners';

import Center from '../../components/customs/Center';
import NoData from '../../components/UI/NoData';


export default function SearchScreen({}) {
	const { search } = useLocation();
	const query = new window.URLSearchParams(search).get('query');

	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState('');
	const [searchResults, setSearchResults] = React.useState([]);

	let content = 'Search Result';

	if (loading) content = (
		<Center>
			<BounceLoader loading={loading} color="#F50057" />
		</Center>
	);

	return (
		<section className={classes.search}>{content}</section>
	);
}
