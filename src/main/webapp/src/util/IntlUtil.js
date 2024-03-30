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
import Constants from "./Constants";

export function loadInitialLocalizationData() {
    const prefLang = localStorage.getItem(Constants.STORAGE_LANG_KEY);
    const lang = prefLang ? prefLang : navigator.language;
    // Default to Czech
    if (!prefLang || (lang === "cs" || lang === "cs-CZ" || lang === "sk" || lang === "sk-SK")) {
        return loadLocalizationData(Constants.LANG.CS.locale);
    } else {
        return loadLocalizationData(Constants.LANG.EN.locale);
    }
}

export function loadLocalizationData(language) {
    if (language === Constants.LANG.CS.locale) {
        return require("../i18n/cs").default;
    } else {
        return require("../i18n/en").default;
    }
}

export function saveLanguagePreference(language) {
    localStorage.setItem(Constants.STORAGE_LANG_KEY, language);
}
