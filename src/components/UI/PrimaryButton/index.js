import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './primary_button.module';

export default function PrimaryButton({ path, children }) {
	return (
		<Link to={path} className={classes.primary_button}>
			{children}
		</Link>
	);
}

PrimaryButton.propTypes = {
	path: PropTypes.string.isRequired,
};
