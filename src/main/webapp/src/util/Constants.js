const constants = {
    APP_NAME: "Altimeter",
    // Will be replaced with actual server url during build
    SERVER_URL: "__SERVER_URL__",
    // Will be replaced by version read from package.json
    VERSION: "__VERSION__",
    INITIAL_LATITUDE: "__INITIAL_LATITUDE__",
    INITIAL_LONGITUDE: "__INITIAL_LONGITUDE__",
    INITIAL_MAP_ZOOM: 14,
    LANG: {
        CS: {
            locale: "cs",
            label: "Čeština"
        },
        EN: {
            locale: "en",
            label: "English"
        }
    },
    STORAGE_LANG_KEY: ""
};

constants.STORAGE_LANG_KEY = constants.APP_NAME + "-LANG";

export default constants;
