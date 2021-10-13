import React from 'react';

import classes from './center.module';

export default function Center({ children }) {
	return <div className={classes.center}>{children}</div>;
}
