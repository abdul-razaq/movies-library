import React from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';

import classes from './layout.module';

import AppBar from '../UI/AppBar';
import SideBar from '../UI/SideBar';
import SideDrawer from '../UI/SideDrawer';

export default function Layout({ children }) {
	const [showSideDrawer, setShowSideDrawer] = React.useState(false);

	const isMobile = useMediaQuery({ query: `(max-width: 37.5em)` });

	function openHamburger() {
		setShowSideDrawer(true);
	}

	function handleSideDrawerDismiss() {
		setShowSideDrawer(false);
	}

	return (
		<section className={classes.layout}>
			{!isMobile && <SideBar />}
			{showSideDrawer &&
				ReactDOM.createPortal(
					<SideDrawer onDismissSideDrawer={handleSideDrawerDismiss} />,
					document.getElementById('root'),
				)}
			<main className={classes.main}>
				<AppBar onOpenHamburger={openHamburger} />
				<h1>MAIN CONTENT</h1>
				{children}
			</main>
		</section>
	);
}
