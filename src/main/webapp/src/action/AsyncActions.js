import ActionType, {AsyncStatus} from "./ActionType";
import Utils from "../util/Utils";
import {publishMessage, updatePosition} from "./SyncActions";
import Ajax from "../util/Ajax";

function asyncRequest(action) {
    return Object.assign({}, action, {status: AsyncStatus.REQUEST});
}

function asyncSuccess(action) {
    return Object.assign({}, action, {status: AsyncStatus.SUCCESS});
}

function asyncFailure(action, error) {
    return Object.assign({}, action, {status: AsyncStatus.FAILURE, error});
}

export function login(username, password) {
    const action = {type: ActionType.LOGIN};
    return dispatch => {
        dispatch(asyncRequest(action));
        const params = new URLSearchParams();
        params.append("username", username);
        params.append("password", password);
        return Ajax.post("login", params, {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
            .then((resp) => {
                if (resp.data.loggedIn) {
                    return dispatch(asyncSuccess(action))
                }
                return Promise.reject(resp.data);
            })
            .catch(error => {
                dispatch(publishMessage({messageId: "login.failure"}));
                return dispatch(asyncFailure(action, error));
            });
    }
}

export function logout() {
    const action = {type: ActionType.LOGOUT};
    return dispatch => {
        dispatch(asyncRequest(action));
        return Ajax.post("logout")
            .then(() => dispatch(asyncSuccess(action)))
            .catch(error => dispatch(asyncFailure(action, error)));
    }
}

export function loadUser() {
    const action = {
        type: ActionType.LOAD_USER
    };
    if (process.env.REACT_APP_USE_AUTH === "true") {
        return dispatch => {
            dispatch(asyncRequest(action));
            return Ajax.get("/users/current")
                .then(() => dispatch(asyncSuccess(action)))
                .catch(error => dispatch(asyncFailure(action, error)));
        };
    } else {
        return asyncSuccess(action);
    }
}

export function loadElevation(lat, long) {
    const action = {
        type: ActionType.LOAD_ELEVATION
    };
    return dispatch => {
        dispatch(asyncRequest(action));
        return Ajax.get("elevation", {
            params: {
                latitude: lat,
                longitude: long
            }
        }).then(resp => dispatch(Object.assign({}, asyncSuccess(action), {elevation: resp.data.elevation})))
            .catch(error => {
                if (error.status === 409) {
                    return dispatch(publishMessage({messageId: "error.position.outOfBounds"}));
                } else {
                    return dispatch(asyncFailure(action, error));
                }
            });
    };
}

export function loadSafetyAltitudeLevel(lat, long) {
    const action = {type: ActionType.LOAD_SAFETY_ALTITUDE_LEVEL};
    return (dispatch, getState) => {
        dispatch(asyncRequest(action));
        return Ajax.get("safetyAltitudeLevel", {
            params: {
                latitude: lat,
                longitude: long
            }
        }).then(resp => dispatch(Object.assign({}, asyncSuccess(action), {
            elevation: resp.data.elevation,
            safetyAltitudeLevel: resp.data.safetyAltitudeLevel,
            maxObstacleHeight: resp.data.maxObstacleHeight,
            safetyZone: resp.data.safetyZone
        })))
            .catch(error => {
                if (error.status === 409) {
                    dispatch(loadElevation(lat, long));
                    return dispatch(Object.assign({}, asyncSuccess(action), {
                        elevation: getState().elevation,
                        safetyAltitudeLevel: Number.MAX_VALUE,
                        maxObstacleHeight: Number.MAX_VALUE
                    }));
                } else {
                    return dispatch(asyncFailure(action, error));
                }
            });
    };
}

export function downloadReport() {
    const action = {type: ActionType.DOWNLOAD_REPORT};
    return (dispatch, getState) => {
        dispatch(asyncRequest(action));
        return Ajax.get("safetyAltitudeLevel/report", {
            responseType: "arraybuffer",
            params: {
                latitude: getState().latitude,
                longitude: getState().longitude,
                lang: getState().intl.locale
            }
        }).then(resp => {
            const mimeType = resp.headers["content-type"];
            Utils.fileDownload(resp.data, mimeType);
            return Promise.resolve();
        }).catch(error => dispatch(asyncFailure(action, error)));
    }
}

export function resolvePositionFromCadaster(area, parcel) {
    const action = {type: ActionType.RESOLVE_POSITION_FROM_CADASTER};
    return dispatch => {
        dispatch(asyncRequest(action));
        return Ajax.get("cadastre/parcelPosition", {
            params: {
                area,
                parcel
            }
        }).then(resp => {
            dispatch(asyncSuccess(action));
            return dispatch(updatePosition(resp.data.latitude, resp.data.longitude));
        }).catch(error => {
            if (error.status === 409) {
                return dispatch(publishMessage({messageId: "error.cadastre.parcelNotFound"}));
            } else {
                return dispatch(asyncFailure(action, error));
            }
        });
    }
}
