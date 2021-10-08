import React from 'react';

import classes from './layout.module';

import AppBar from '../AppBar';

export default function Layout({ children }) {
  return (
    <section className={classes.layout}>
      <aside className={classes.sidebar}>

      </aside>
      <main className={classes.main}>
        <AppBar />
        { children }
      </main>
    </section>
  );
}
