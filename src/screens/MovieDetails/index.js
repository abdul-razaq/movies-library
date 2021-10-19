import React from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetailsScreen({}) {
	const { movieID } = useParams();

	return <h1>MOVIE DETAILS SCREEN - Showing details for {movieID} movie.</h1>;
}
