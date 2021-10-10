import React from 'react';
import { Link } from 'react-router-dom';

import classes from './logo.module';

import logo from '../../../../public/assets/images/logo.svg';

export default function Logo({}) {
	return (
		<div className={classes.logo}>
			<Link to="/discover/popular">
				<img src={logo} alt="movie logo" />
			</Link>
		</div>
	);
}
