import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { FaArrowUp } from 'react-icons/fa';

import MoviesList from '../../components/MoviesList';
import Center from '../../components/customs/Center';
import NoData from '../../components/UI/NoData';
import SecondaryButton from '../../components/UI/SecondaryButton';

import classes from './shelf.module';

export default function ShelfScreen({}) {
	const { type } = useParams();

	const { favorites, watching } = useSelector(state => state.shelf);
	const shelf = { favorites, watching };

	const topRef = React.useRef(null);

	function handleScrollToTop() {
		topRef.current.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}

	return (
		<section ref={topRef} className={classes.shelf}>
			{!shelf[type].length ? (
				<Center>
					<NoData
						text={`You have not added any movie to your ${
							type === 'favorites' ? type : 'Watch later'
						} shelf. start by adding some.`}
					/>
				</Center>
			) : (
				<>
					<MoviesList
						category={
							type === 'favorites' ? type.replace('s', '') : `watch later`
						}
						movies={shelf[type]}
					/>
					<div className={classes.scrollToTop}>
						<SecondaryButton onClick={handleScrollToTop}>
							<FaArrowUp />
							<span>Back to top</span>
						</SecondaryButton>
					</div>
				</>
			)}
		</section>
	);
}
