import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MoviesList from '../../components/MoviesList';
import Center from '../../components/customs/Center';
import NoData from '../../components/UI/NoData';

import classes from './shelf.module';

export default function ShelfScreen({}) {
	const { type } = useParams();

	const { favorites, watching } = useSelector(state => state.shelf);
	const shelf = { favorites, watching };

	const topRef = React.useRef(null);

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
				<MoviesList
					category={
						type === 'favorites' ? type.replace('s', '') : `watch later`
					}
					movies={shelf[type]}
				/>
			)}
			<ScrollToTop />
		</section>
	);
}
