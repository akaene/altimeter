import ActionType from "./ActionType";
import {saveLanguagePreference} from "../util/IntlUtil";

export function updatePosition(lat, long) {
    return {
        type: ActionType.UPDATE_POSITION,
        lat,
        long
    };
}

export function resetElevationAndSafetyLevelData() {
    return {type: ActionType.RESET_ELEVATION_AND_SAFETY_LEVEL};
}

export function toggleCadastralMap() {
    return {type: ActionType.TOGGLE_CADASTER};
}

export function switchLanguage(language) {
    saveLanguagePreference(language);
    return {
        type: ActionType.SWITCH_LANGUAGE,
        language
    };
}

export function publishMessage(message) {
    return {
        type: ActionType.PUBLISH_MESSAGE,
        message
    };
}

export function dismissMessage(message) {
    return {
        type: ActionType.DISMISS_MESSAGE,
        message
    };
}
