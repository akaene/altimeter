import ActionType, {AsyncStatus} from "../action/ActionType";
import {combineReducers} from "redux";
import {loadInitialLocalizationData, loadLocalizationData} from "../util/IntlUtil";
import Constants from "../util/Constants";

function latitude(state = Number(Constants.INITIAL_LATITUDE), action) {
    if (action.type === ActionType.UPDATE_POSITION) {
        return action.lat;
    } else {
        return state;
    }
}

function longitude(state = Number(Constants.INITIAL_LONGITUDE), action) {
    if (action.type === ActionType.UPDATE_POSITION) {
        return action.long;
    } else {
        return state;
    }
}

function elevation(state = -1, action) {
    if (action.type === ActionType.UPDATE_POSITION || action.type === ActionType.RESET_ELEVATION_AND_SAFETY_LEVEL) {
        return -1;
    } else if ((action.type === ActionType.LOAD_ELEVATION || action.type === ActionType.LOAD_SAFETY_ALTITUDE_LEVEL) && action.status === AsyncStatus.SUCCESS) {
        return action.elevation;
    } else if ((action.type === ActionType.LOAD_ELEVATION || action.type === ActionType.LOAD_SAFETY_ALTITUDE_LEVEL) && action.status === AsyncStatus.FAILURE) {
        return -1;
    } else {
        return state;
    }
}

function safetyAltitudeLevel(state = -1, action) {
    return reduceState(state, action, "safetyAltitudeLevel", -1);
}

function reduceState(state, action, property, defaultValue) {
    if (action.type === ActionType.UPDATE_POSITION || action.type === ActionType.RESET_ELEVATION_AND_SAFETY_LEVEL) {
        return defaultValue;
    } else if (action.type === ActionType.LOAD_SAFETY_ALTITUDE_LEVEL && action.status === AsyncStatus.SUCCESS) {
        return action[property] !== undefined ? action[property] : defaultValue;
    } else if (action.type === ActionType.LOAD_SAFETY_ALTITUDE_LEVEL && action.status === AsyncStatus.FAILURE) {
        return defaultValue;
    } else {
        return state;
    }
}

function maxObstacleHeight(state = -1, action) {
    return reduceState(state, action, "maxObstacleHeight", -1);
}

function safetyZone(state = null, action) {
    return reduceState(state, action, "safetyZone", null);
}

function cadastralMap(state = true, action) {
    if (action.type === ActionType.TOGGLE_CADASTER) {
        return !state;
    }
    return state;
}

function intl(state = loadInitialLocalizationData(), action) {
    if (action.type === ActionType.SWITCH_LANGUAGE) {
        return loadLocalizationData(action.language);
    } else {
        return state;
    }
}

function messages(state = [], action) {
    switch (action.type) {
        case ActionType.PUBLISH_MESSAGE:
            return [...state, action.message];
        case ActionType.DISMISS_MESSAGE:
            const newArr = state.slice(0);
            newArr.splice(newArr.indexOf(action.message), 1);
            return newArr;
        default:
            return state;
    }
}

function loggedIn(state = null, action) {
    if ((action.type === ActionType.LOGIN || action.type === ActionType.LOAD_USER) && action.status === AsyncStatus.SUCCESS) {
        return true;
    } else if ((action.type === ActionType.LOAD_USER && action.status === AsyncStatus.FAILURE) || (action.type === ActionType.LOGOUT && action.status === AsyncStatus.SUCCESS)) {
        return false;
    }
    return state;
}

const rootReducer = combineReducers({
    cadastralMap,
    latitude,
    longitude,
    elevation,
    safetyAltitudeLevel,
    maxObstacleHeight,
    safetyZone,
    messages,
    intl,
    loggedIn
});

export default rootReducer;
