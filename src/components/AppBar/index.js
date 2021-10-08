import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

import classes from './app_bar.module';

import ThemeContext from '../../contexts/theme';

import SearchInput from '../SearchInput';

export default function AppBar({}) {
	const { theme, toggleTheme } = React.useContext(ThemeContext);

	return (
		<header className={classes.appbar}>
			<SearchInput/>
			<button className={classes.themeToggler} onClick={toggleTheme}>
				{theme === 'light' ? <FaMoon /> : <FaSun />}
				<span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
			</button>
		</header>
	);
}
