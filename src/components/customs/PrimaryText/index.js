import React from 'react';
import PropTypes from 'prop-types';

import classes from './primary_text.module';

export default function PrimaryText({ size = 1.8, children, style }) {
	return (
		<h1
			style={{ ...style, fontSize: `${size}rem` }}
			className={classes.primaryText}
		>
			{children}
		</h1>
	);
}

PrimaryText.propTypes = {
	size: PropTypes.number,
};
