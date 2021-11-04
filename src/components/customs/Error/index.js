import React from 'react';
import PropTypes from 'prop-types';

import NoData from '../../UI/NoData';
import Center from '../Center';

export default function Error({ text }) {
	return (
		<Center>
			<NoData text={text} />
		</Center>
	);
}

Error.propTypes = {
	text: PropTypes.string.isRequired,
};
