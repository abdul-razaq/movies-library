import React from 'react';

import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';

function NextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<FaArrowCircleRight
			className={className}
			onClick={onClick}
			color="currentColor"
			size={16}
			title="next cast arrow"
		/>
	);
}

function PrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<FaArrowCircleLeft
			className={className}
			onClick={onClick}
			color="currentColor"
			size={16}
			title="previous cast arrow"
		/>
	);
}

export default function Cast({ children }) {
	const isMobile = useMediaQuery({ query: `(max-width: 37.5em)` });
	const isTablet = useMediaQuery({ query: `(max-width: 75em)` });

	const sliderSettings = {
		dots: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		swipeToSlide: true,
		speed: 500,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		slidesToShow: isMobile ? 3 : isTablet ? 4 : 5,
		slidesToScroll: 1,
		cssEase: 'linear',
	};
	return <Slider {...sliderSettings}>{children}</Slider>;
}
