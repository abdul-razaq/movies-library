import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

import classes from './app_bar.module';

import ThemeContext from '../../contexts/theme';

import SearchInput from '../SearchInput';

export default function AppBar({}) {
	const { theme, toggleTheme } = React.useContext(ThemeContext);
	const isMobile = useMediaQuery({ query: `(max-width: 37.5em)` });

	return (
		<header className={classes.appbar}>
			{!isMobile ? <SearchInput /> : <p>HAMBURGER</p>}
			<button className={classes.themeToggler} onClick={toggleTheme}>
				{theme === 'light' ? <FaMoon /> : <FaSun />}
				<span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
			</button>
		</header>
	);
}
