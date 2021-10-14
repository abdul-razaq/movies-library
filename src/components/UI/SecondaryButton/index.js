import React from 'react';
import PropTypes from 'prop-types';

import classes from './secondary_button.module';

export default function SecondaryButton({ children, className, disable, onClick }) {
	return (
		<button
			className={`${classes.secondary_button} ${className}`}
			onClick={onClick}
      disable={disable}
		>
			{children}
		</button>
	);
}

SecondaryButton.propTypes = {
  className: PropTypes.string,
  disable: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};
