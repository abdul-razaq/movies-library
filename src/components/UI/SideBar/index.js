import React from 'react';

import classes from './sidebar.module';

import Logo from '../Logo';
import Navigation from '../../Navigation';

export default function SideBar({}) {
	return (
		<aside className={classes.sidebar}>
			<Logo />
			<Navigation />
		</aside>
	);
}
