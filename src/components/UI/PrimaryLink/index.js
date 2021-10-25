import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import classes from './primary_link.module.scss';

export default function PrimaryLink(props) {
	return (
		<Link {...props} className={classes.primary_link} to={props.to}>
			{props.children}
		</Link>
	);
}

PrimaryLink.propTypes = {
	to: PropTypes.string.isRequired,
};
