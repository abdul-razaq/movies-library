import React from 'react';
import { FaHome } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

import classes from './four_oh_four.module';

import FourOhFourImage from '../../../public/assets/images/four-oh-four.svg';

import PrimaryButton from '../../components/UI/PrimaryButton';
import PrimaryText from '../../components/customs/PrimaryText';

export default function FourOhFour({}) {
	const text = useLocation()?.state?.text;

	return (
		<section className={classes.fourOhfour}>
			<div>
				<figure className={classes.image}>
					<img src={FourOhFourImage} alt="four-oh-four image"></img>
				</figure>
				<PrimaryText>
					{text
						? `Sorry, cannot find ${text}`
						: 'Oops! Sorry, you took the wrong path.'}
				</PrimaryText>
				<PrimaryButton path="/discover/popular">
					<FaHome />
					<span>Home</span>
				</PrimaryButton>
			</div>
		</section>
	);
}
