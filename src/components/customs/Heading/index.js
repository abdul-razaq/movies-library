import React from 'react';
import PropTypes from 'prop-types';

import classes from './heading.module';

export default function Heading({ title, subtitle, className, style }) {
	return (
		<div className={`${classes.heading} ${className}`} style={{ ...style }}>
			<h1>{title}</h1>
			<h3>{subtitle}</h3>
		</div>
	);
}

Heading.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
};
