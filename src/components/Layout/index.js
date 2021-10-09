import React from 'react';
import { Link } from 'react-router-dom';

import classes from './layout.module';

import AppBar from '../AppBar';

import logo from '../../../public/assets/images/logo.svg';

export default function Layout({ children }) {
	return (
		<section className={classes.layout}>
			<aside className={classes.sidebar}>
				<div className={classes.logo}>
					<Link to="/discover/popular">
						<img src={logo} alt="" />
					</Link>
				</div>
			</aside>
			<main className={classes.main}>
				<AppBar />
				<h1>MAIN CONTENT</h1>
				{children}
			</main>
		</section>
	);
}
