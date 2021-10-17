import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

import classes from './app_bar.module';

import ThemeContext from '../../../contexts/theme';

import SearchInput from '../SearchInput';
import Hamburger from '../Hamburger';

export default function AppBar({ onOpenHamburger }) {
	const { theme, toggleTheme } = React.useContext(ThemeContext);

	const isMobile = useMediaQuery({ query: `(max-width: 37.5em)` });

	const history = useHistory();

	function handleOpenHamburger() {
		onOpenHamburger();
	}

	return (
		<header
			style={{ padding: isMobile ? '3rem' : '' }}
			className={classes.appbar}
		>
			{!isMobile ? (
				<SearchInput
					onSearchSubmit={(searchValue) => history.push(`/search?query=${searchValue}`)}
				/>
			) : (
				<Hamburger onClick={handleOpenHamburger} />
			)}
			<button className={classes.themeToggler} onClick={toggleTheme}>
				{theme === 'light' ? <FaMoon /> : <FaSun />}
				<span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
			</button>
		</header>
	);
}
