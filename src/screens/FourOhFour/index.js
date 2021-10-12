import React from 'react';
import { FaHome } from 'react-icons/fa';

import classes from './four_oh_four.module';

import FourOhFourImage from '../../../public/assets/images/four-oh-four.svg';

import PrimaryButton from '../../components/UI/PrimaryButton';

export default function FourOhFour({}) {
	return (
		<section className={classes.fourOhfour}>
			<figure className={classes.image}>
				<img src={FourOhFourImage} alt="four-oh-four image"></img>
			</figure>
			<h1>Oops! Sorry, you have taken the wrong path.</h1>
			<PrimaryButton to='/discover/popular' icon={<FaHome/>} text={"home"} />
		</section>
	);
}
