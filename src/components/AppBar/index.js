import React from 'react';
import { FaSearch, FaMoon, FaSun } from 'react-icons/fa';

import classes from './app_bar.module';

import ThemeContext from '../../contexts/theme';

export default function AppBar({}) {
	const [searchActive, setSearchActive] = React.useState(false);

	const { theme, toggleTheme } = React.useContext(ThemeContext);

	function toggleSearch() {
		setSearchActive(searchValue => !searchValue);
	}

	return (
		<header className={classes.appbar}>
			<form style={styles.search}>
				<button
					style={styles.searchButton}
					type="button"
					onClick={toggleSearch}
				>
					<FaSearch />
				</button>
				<input
					style={{ ...styles.searchInput, width: searchActive ? '35rem' : 0 }}
					type="search"
					name="search"
					id="search"
				/>
			</form>
			<button className={classes.themeToggler} onClick={toggleTheme}>
				{theme === 'light' ? <FaMoon /> : <FaSun />}
				<span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
			</button>
		</header>
	);
}

const styles = {
	search: {
		display: 'flex',
	},
	searchButton: {
		background: 'none',
		color: 'var(--color-dark-grey-primary)',
		fontSize: '1.6rem',
		cursor: 'pointer',
		transform: 'translateX(3.45rem)',
		marginTop: '2px',
		borderRadius: '50%',
		padding: '6px',
	},
	searchInput: {
		padding: '1.2rem 2rem',
		borderRadius: '20rem',
		transition: 'all .4s ease-in',
	},
};
