import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchScreen({}) {
	const { search } = useLocation();
  const query = new window.URLSearchParams(search).get('query');

	return <h1>SEARCH SCREEN - Showing search result for {query}.</h1>;
}
