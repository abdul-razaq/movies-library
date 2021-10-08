import React from 'react';
import { useParams } from 'react-router-dom';

import classes from './all_movies.module';

export default function AllMovies({}) {
  const params = useParams();
  console.log(params);
  
	return <h1>All Movies Screen</h1>;
}
