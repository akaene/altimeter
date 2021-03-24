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
