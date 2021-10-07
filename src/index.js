import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import './index.scss';

const rootApp = <App />;
const rootElement = document.querySelector('#root');

ReactDOM.render(<React.StrictMode>{rootApp}</React.StrictMode>, rootElement);
