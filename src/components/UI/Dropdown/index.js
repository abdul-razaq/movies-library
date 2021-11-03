import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from '../../../contexts/theme';

import classes from './dropdown.module';

function renderDropdown(
	label,
	showDropdown,
	options,
	handleFilterSelect,
	setShowDropdown,
) {
	const { theme } = React.useContext(ThemeContext);

	return (
		<div className={classes.dropdown}>
			<Select
				theme={theme}
				label={label}
				showDropdown={showDropdown}
				setShowDropdown={setShowDropdown}
			/>

			<Options
				theme={theme}
				options={options}
				showDropdown={showDropdown}
				handleFilterSelect={handleFilterSelect}
			/>
		</div>
	);
}

const Select = React.memo(({ theme, label, showDropdown, setShowDropdown }) => {
	return (
		<div
			style={styles.select(theme)}
			className={classes.select}
			onClick={() => setShowDropdown(v => !v)}
		>
			<span>{label}</span>
			<span>{showDropdown ? '\u25B2' : '\u25BC'}</span>
		</div>
	);
});

const Options = React.memo(
	({ theme, options, showDropdown, handleFilterSelect }) => {
		return (
			<ul
				className={classes.options}
				style={styles.options(theme, showDropdown)}
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
		);
	},
);

export default function DropDown({ label, options, onSelect }) {
	const [showDropdown, setShowDropdown] = React.useState(false);

	function handleFilterSelect(selectedFilter) {
		onSelect(selectedFilter);
		setShowDropdown(false);
	}

	return renderDropdown(
		label,
		showDropdown,
		options,
		handleFilterSelect,
		setShowDropdown,
	);
}

const styles = {
	select(theme) {
		return {
			backgroundColor:
				theme === 'light'
					? 'var(--color-light-secondary)'
					: 'var(--color-dark-secondary)',
		};
	},
	options(theme, showDropdown) {
		return {
			backgroundColor:
				theme === 'light'
					? 'var(--color-light-secondary)'
					: 'var(--color-dark-secondary)',
			display: showDropdown ? 'block' : 'none',
		};
	},
};

DropDown.propTypes = {
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
	).isRequired,
	onSelect: PropTypes.func.isRequired,
};
