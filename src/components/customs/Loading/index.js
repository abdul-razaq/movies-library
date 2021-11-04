import React from 'react';
import PropTypes from 'prop-types';

import { BounceLoader } from 'react-spinners';
import Center from '../Center';

export default function Loading({
	isLoading = true,
	color = '#F50057',
	speed = 1.8,
}) {
	return (
		<Center>
			<BounceLoader loading={isLoading} color={color} speedMultiplier={speed} />
		</Center>
	);
}

Loading.propTypes = {
	isLoading: PropTypes.boolean,
	color: PropTypes.string,
	speed: PropTypes.number,
};
