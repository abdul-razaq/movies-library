import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './sidedrawer.module';

import BackDrop from '../Backdrop';
import Logo from '../Logo';
import SearchInput from '../SearchInput';
import Navigation from '../../Navigation';

import ThemeContext from '../../../contexts/theme';

export default function SideDrawer({ onDismissSideDrawer }) {
	const { theme } = React.useContext(ThemeContext);
	const history = useHistory();

	return (
		<BackDrop onClick={onDismissSideDrawer}>
			<aside className={classes.sidedrawer} style={styles.background(theme)}>
				<Logo />
				<SearchInput
					onSearchSubmit={searchValue =>
						history.push(`/search?query=${searchValue}`)
					}
				/>
				<Navigation />
			</aside>
		</BackDrop>
	);
}

SideDrawer.propTypes = {
	onDismissSideDrawer: PropTypes.func.isRequired,
};

const styles = {
	background: theme => ({
		background:
			theme === 'light'
				? 'var(--color-light-secondary)'
				: 'var(--color-dark-secondary)',
		color:
			theme === 'light' ? 'var(--text-color-light)' : 'var(--text-color-dark)',
	}),
};
