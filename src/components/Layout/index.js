import React from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';

import classes from './layout.module';

import AppBar from '../AppBar';
import SideBar from '../SideBar';
import SideDrawer from '../SideDrawer';

export default function Layout({ children }) {
	const [showSideDrawer, setShowSideDrawer] = React.useState(false);

	const isMobile = useMediaQuery({ query: `(max-width: 37.5em)` });

	function toggleHamburger() {
		setShowSideDrawer(prevValue => !prevValue);
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
				<AppBar onToggleHamburger={toggleHamburger} />
				<h1>MAIN CONTENT</h1>
				{children}
			</main>
		</section>
	);
}
