import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './primary_button.module';

export default function PrimaryButton({ path, icon, text }) {
	return (
		<Link to={path} className={classes.primary_button}>
			{icon}
			<span>{text}</span>
		</Link>
	);
}

PrimaryButton.propTypes = {
	path: PropTypes.string.isRequired,
	icon: PropTypes.object.isRequired,
	text: PropTypes.string.isRequired,
};
