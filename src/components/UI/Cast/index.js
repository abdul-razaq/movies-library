import React from 'react';

import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import Slider from 'react-slick';

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

const sliderSettings = {
	dots: false,
	infinite: true,
	autoplay: true,
	autoplaySpeed: 3000,
	swipeToSlide: true,
	speed: 500,
	nextArrow: <NextArrow />,
	prevArrow: <PrevArrow />,
	slidesToShow: 5,
	slidesToScroll: 1,
	cssEase: 'linear',
};

export default function Cast({ children }) {
	return (
		<Slider {...sliderSettings}>
			{children}
		</Slider>
	);
}
