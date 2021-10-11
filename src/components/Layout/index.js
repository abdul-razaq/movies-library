import React from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';

import classes from './layout.module';

import AppBar from '../UI/AppBar';
import SideBar from '../UI/SideBar';
import SideDrawer from '../UI/SideDrawer';

import { SideDrawerProvider } from '../../contexts/sidedrawer';

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
					<SideDrawerProvider
						value={{
							showSideDrawer,
							dismissSideDrawer: handleSideDrawerDismiss,
						}}
					>
						<SideDrawer onDismissSideDrawer={handleSideDrawerDismiss} />
					</SideDrawerProvider>,
					document.getElementById('root'),
				)}
			<main className={classes.main}>
				<AppBar onOpenHamburger={openHamburger} />
				{children}
			</main>
		</section>
	);
}
