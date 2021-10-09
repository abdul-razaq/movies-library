import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHeart, FaChartBar, FaTruckLoading } from 'react-icons/fa';
import PropTypes from 'prop-types';

import classes from './sidebar.module';

import logo from '../../../public/assets/images/logo.svg';

export default function SideBar({}) {

	return (
		<aside className={classes.sidebar}>
			<div className={classes.logo}>
				<Link to="/discover/popular">
					<img src={logo} alt="movie logo" />
				</Link>
			</div>
			<nav className={classes.navigation}>
				<h4>Discover</h4>
				<NavLink
					to="/discover/popular"
					activeClassName={classes.active}
					className={classes.link}
				>
					<FaHeart />
					<span>Popular</span>
				</NavLink>
				<NavLink
					to="/discover/top-rated"
					activeClassName={classes.active}
					className={classes.link}
				>
					<FaChartBar />
					<span>Top Rated</span>
				</NavLink>
				<NavLink
					to="/discover/upcoming"
					activeClassName={classes.active}
					className={classes.link}
				>
					<FaTruckLoading />
					<span>Upcoming</span>
				</NavLink>
			</nav>
		</aside>
	);
}
