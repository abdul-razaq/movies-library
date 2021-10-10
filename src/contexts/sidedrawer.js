import React from 'react';

const SideDrawerContext = React.createContext({
	showSideDrawer: false,
	dismissSideDrawer: () => {},
});

export const SideDrawerProvider = SideDrawerContext.Provider;
export const SideDrawerConsumer = SideDrawerContext.Consumer;

export default SideDrawerContext;
