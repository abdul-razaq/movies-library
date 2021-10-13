import React from 'react';
import PropTypes from 'prop-types';

import classes from './nodata.module';

import nodataImage from '../../../../public/assets/images/nodata.svg';

import PrimaryText from '../../customs/PrimaryText';

export default function NoData({ text }) {
	return (
		<div className={classes.nodata}>
			<div className={classes.nodata__image}>
				<img src={nodataImage} alt="nodata image" />
			</div>
			<PrimaryText>{text}</PrimaryText>
		</div>
	);
}

NoData.propTypes = {
	text: PropTypes.string.isRequired,
};
