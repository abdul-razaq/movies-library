import React from 'react';
import { useParams } from 'react-router-dom';

export default function MovieScreen({}) {
	const { movieID } = useParams();

	return <h1>MOVIE SCREEN - Showing details for {movieID} movie.</h1>;
}
