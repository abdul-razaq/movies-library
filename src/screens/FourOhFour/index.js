import React from 'react';
import { FaHome } from 'react-icons/fa';

import classes from './four_oh_four.module';

import FourOhFourImage from '../../../public/assets/images/four-oh-four.svg';

import PrimaryButton from '../../components/UI/PrimaryButton';
import PrimaryText from '../../components/customs/PrimaryText';

export default function FourOhFour({}) {
	return (
		<section className={classes.fourOhfour}>
			<div>
				<figure className={classes.image}>
					<img src={FourOhFourImage} alt="four-oh-four image"></img>
				</figure>
				<PrimaryText>Oops! Sorry, you took the wrong path.</PrimaryText>
				<PrimaryButton path="/discover/popular" icon={<FaHome />} text={'home'} />
			</div>
		</section>
	);
}
