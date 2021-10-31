import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from '../../../contexts/theme';

import classes from './dropdown.module';

export default function DropDown({ options, onSelect }) {
	const [showDropdown, setShowDropdown] = React.useState(false);

	const { theme } = React.useContext(ThemeContext);

	function handleFilterSelect(selectedFilter) {
		onSelect(selectedFilter);
		setShowDropdown(false);
	}

	return (
		<div className={classes.dropdown}>
			<div
				style={{
					backgroundColor:
						theme === 'light'
							? 'var(--color-light-secondary)'
							: 'var(--color-dark-secondary)',
				}}
				className={classes.select}
				onClick={() => setShowDropdown(v => !v)}
			>
				<span>Filter Movies</span>
				<span>{showDropdown ? '\u25B2' : '\u25BC'}</span>
			</div>
			<ul
				// style={{
				// 	// display: `${showDropdown ? 'block' : 'none'}`,
				// 	transition: 'all .4s ease-out',
				// 	transform: `${showDropdown ? 'translateY(0)' : 'translateY(-100%)'}`,
				// }}
				className={classes.options}
				style={{
					backgroundColor:
						theme === 'light'
							? 'var(--color-light-secondary)'
							: 'var(--color-dark-secondary)',
				}}
			>
				{options.map(option => (
					<li
						onClick={handleFilterSelect.bind(null, option)}
						key={option.label}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
}

DropDown.propTypes = {};
