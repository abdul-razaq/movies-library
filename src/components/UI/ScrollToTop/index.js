import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

import SecondaryButton from '../SecondaryButton';

export default function ScrollToTop({}) {
	function handleScrollToTop() {
		topRef.current.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}

	return (
		<div className={classes.scrollToTop}>
			<SecondaryButton onClick={handleScrollToTop}>
				<FaArrowUp />
				<span>Back to top</span>
			</SecondaryButton>
		</div>
	);
}
