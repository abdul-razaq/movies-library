import React from 'react';

import classes from './hamburger.module';

export default function Hamburger({ onClick }) {
	return (
		<div className={classes.hamburger} onClick={onClick}>
			<div></div>
		</div>
	);
}
