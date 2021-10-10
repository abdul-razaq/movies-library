import React from 'react';
import PropTypes from 'prop-types';

import classes from './sidedrawer.module';

import BackDrop from '../Backdrop';

export default function SideDrawer({ onDismissSideDrawer }) {
	return (
		<BackDrop onClick={onDismissSideDrawer}>
			<div className={classes.sidedrawer}></div>
		</BackDrop>
	);
}

SideDrawer.propTypes = {
	onDismissSideDrawer: PropTypes.func.isRequired,
};
