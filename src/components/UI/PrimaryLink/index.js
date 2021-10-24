import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import classes from './primary_link.module.scss';

export default function PrimaryLink({ to, children }) {
	return (
		<Link className={classes.primary_link} to={to}>
			{children}
		</Link>
	);
}

PrimaryLink.propTypes = {
	to: PropTypes.string.isRequired,
};
