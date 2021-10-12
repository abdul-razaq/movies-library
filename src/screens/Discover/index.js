import React from 'react';
import { useParams } from 'react-router-dom';

export default function DiscoverScreen({}) {
	const { category } = useParams();

	return <h1>DISCOVER SCREEN - Showing list of {category} movies</h1>;
}
