import React from 'react';
import { useParams } from 'react-router-dom';

export default function CastScreen({}) {
	const { castID } = useParams();

	return <h1>CAST SCREEN - Showing Details for {castID} cast.</h1>;
}
