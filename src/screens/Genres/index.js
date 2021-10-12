import React from 'react';
import { useParams } from 'react-router-dom';

export default function GenresScreen({}) {
	const { genre } = useParams();

	return <h1>GENRES SCREEN - Showing list of {genre} movies.</h1>;
}
