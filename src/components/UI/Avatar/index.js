import React from 'react';
import PropTypes from 'prop-types';

import NoProfile from '../../../../public/assets/images/no-profile.svg';

import classes from './avatar.module';

export default function Avatar({ image, name }) {
	return (
		<div className={classes.avatar}>
			<img
				src={image ? `https://image.tmdb.org/t/p/w45/${image}` : NoProfile}
				alt={name}
			/>
		</div>
	);
}

Avatar.propTypes = {
	image: PropTypes.string,
	name: PropTypes.string.isRequired,
};
