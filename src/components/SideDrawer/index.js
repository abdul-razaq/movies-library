import React from 'react';

import classes from './sidedrawer.module';

import BackDrop from '../Backdrop';
import SideBar from '../SideBar';

export default function SideDrawer({ onDismissSideDrawer }) {
  
	return (
		<BackDrop onClick={onDismissSideDrawer}>
			<div className={classes.sidedrawer}>

      </div>
		</BackDrop>
	);
}
