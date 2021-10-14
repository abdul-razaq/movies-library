import React from 'react';
import PropTypes from 'prop-types';

import classes from './secondary_button.module';

export default function SecondaryButton({ children, className, onClick }) {
	return (
		<button
			className={`${classes.secondary_button} ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

SecondaryButton.propTypes = {};
