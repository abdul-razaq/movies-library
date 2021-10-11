import React from 'react';

import classes from './four_oh_four.module';

import FourOhFourImage from '../../../public/assets/images/four-oh-four.svg';

export default function FourOhFour({}) {
	return (
		<section className={classes.fourOhfour}>
			<figure className={classes.image}>
				<img src={FourOhFourImage} alt="four-oh-four image"></img>
			</figure>
			<h1>Oops! Sorry, you have taken the wrong path.</h1>
		</section>
	);
}
