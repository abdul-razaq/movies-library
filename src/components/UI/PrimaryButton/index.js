import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './primary_button.module';

export default function PrimaryButton({ to, icon, text }) {
	return (
		<Link to={to} replace className={classes.primary_button}>
			{icon}
			<span>{text}</span>
		</Link>
	);
}

PrimaryButton.propTypes = {
	to: PropTypes.string.isRequired,
	icon: PropTypes.object.isRequired,
	text: PropTypes.string.isRequired,
};
