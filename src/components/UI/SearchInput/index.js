import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

import classes from './search_input.module';

import SideDrawerContext from '../../../contexts/sidedrawer';

export default function SearchInput({ width = 35 }) {
	const [searchValue, setSearchValue] = React.useState('');
	const [searchActive, setSearchActive] = React.useState(false);

	const { dismissSideDrawer } = React.useContext(SideDrawerContext);

	const history = useHistory();

	function handleSearchSubmit(event) {
		event.preventDefault();
		setSearchActive(searchValue => !searchValue);
		if (searchActive && searchValue.trim()) {
			history.push(`/search?query=${searchValue}`);
			setSearchValue('');
			dismissSideDrawer();
		}
	}

	function handleSearchChange(event) {
		setSearchValue(event.target.value);
	}

	return (
		<form
			className={classes.search}
			onClick={event => event.stopPropagation()}
			onSubmit={handleSearchSubmit}
		>
			<button className={classes.search__button}>
				<FaSearch />
			</button>
			<input
				style={{
					width: searchActive ? `${width}rem` : 0,
					paddingLeft: searchActive && '4.5rem',
				}}
				className={classes.search__input}
				type="search"
				name="search"
				id="search"
				placeholder="Search for movie..."
				minLength={3}
				maxLength={20}
				value={searchValue}
				onChange={handleSearchChange}
			/>
		</form>
	);
}

SearchInput.propTypes = {
	width: PropTypes.number,
};
