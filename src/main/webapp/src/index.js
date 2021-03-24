import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as en from "react-intl/locale-data/en";
import * as cs from "react-intl/locale-data/cs";
import {addLocaleData} from "react-intl";
import * as serviceWorker from './serviceWorker';

// Load react-intl locales
addLocaleData([...en, ...cs]);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
