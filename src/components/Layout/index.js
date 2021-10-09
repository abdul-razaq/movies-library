import React from 'react';

import classes from './layout.module';

import AppBar from '../AppBar';
import SideBar from '../SideBar';

export default function Layout({ children }) {
	return (
		<section className={classes.layout}>
			<SideBar />
			<main className={classes.main}>
				<AppBar />
				<h1>MAIN CONTENT</h1>
				{children}
			</main>
		</section>
	);
}
