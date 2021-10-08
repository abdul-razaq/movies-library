import React from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

import classes from './search_input.module';

export default function SearchInput({ width = 35 }) {
	const [searchValue, setSearchValue] = React.useState('');
	const [searchActive, setSearchActive] = React.useState(false);

	function toggleSearch() {
		setSearchActive(searchValue => !searchValue);
	}

	function handleSearchChange(event) {
		setSearchValue(event.target.value);
	}

	return (
		<form className={classes.search}>
			<button
				className={classes.search__button}
				type="button"
				onClick={toggleSearch}
			>
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
