/**
 * Aggregated object of process.env and window.__config__ to allow dynamic configuration
 */
const ENV = {
        ...Object.keys(process.env).reduce((acc, key) => {
        const strippedKey = key.replace("REACT_APP_", "");
        acc[strippedKey] = process.env[key];
        return acc;
    }, {}),
    ...window.__config__,
};

/**
 * Helper to make sure that all envs are defined properly
 * @param name env variable name (without the REACT_APP prefix)
 * @param defaultValue Default variable name
 */
export function getEnv(name, defaultValue) {
    const value = ENV[name] || defaultValue;
    if (value !== undefined) {
        return value;
    }
    throw new Error(`Missing environment variable: ${name}`);
}

const constants = {
    APP_NAME: "Altimeter",
    SERVER_URL: getEnv("SERVER_URL", ""),
    VERSION: getEnv("VERSION"),
    INITIAL_LATITUDE: getEnv("INITIAL_LATITUDE", "50.107738"),
    INITIAL_LONGITUDE: getEnv("INITIAL_LONGITUDE", "14.245939"),
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
