import React from 'react';
import PropTypes from 'prop-types';

import classes from './backdrop.module';

export default function BackDrop({ children, onClick }) {
	return (
		<div className={classes.backdrop} onClick={onClick}>
			{children}
		</div>
	);
}

BackDrop.propTypes = {
	onClick: PropTypes.func.isRequired,
};
