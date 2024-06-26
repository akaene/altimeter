/*
 * Altimeter
 * Copyright (C) 2024 AKAENE Partners
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
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
