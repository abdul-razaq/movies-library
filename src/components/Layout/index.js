import React from 'react';

import classes from './layout.module';

import AppBar from '../AppBar';

export default function Layout({ children }) {
  return (
    <section className={classes.layout}>
      <aside className={classes.sidebar}>
        <h1>SIDEBAR</h1>
      </aside>
      <main className={classes.main}>
        <AppBar />
        <h1>MAIN CONTENT</h1>
        { children }
      </main>
    </section>
  );
}
