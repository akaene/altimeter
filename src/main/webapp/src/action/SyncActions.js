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
