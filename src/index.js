import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './store';

import App from './components/App';
import './index.scss';

const appStore = Redux.createStore(
	rootReducer,
	Redux.applyMiddleware(ReduxThunk),
);

const rootApp = (
	<Provider store={appStore}>
		<App />
	</Provider>
);
const rootElement = document.querySelector('#root');

ReactDOM.render(<React.StrictMode>{rootApp}</React.StrictMode>, rootElement);
