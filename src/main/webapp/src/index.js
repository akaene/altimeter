import React from 'react';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createRoot} from "react-dom/client";

if (!Intl.PluralRules) {
    // @ts-ignore
    import("@formatjs/intl-pluralrules/polyfill");
    // @ts-ignore
    import("@formatjs/intl-pluralrules/locale-data/en"); // Add locale data for en
    // @ts-ignore
    import("@formatjs/intl-pluralrules/locale-data/cs"); // Add locale data for cs
}

const root = createRoot(document.getElementById('root'));

root.render(<App/>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
