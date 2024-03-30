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
const ActionType = {
    LOAD_USER: "LOAD_USER",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    UPDATE_GEO_DATA: "UPDATE_GEO_DATA",
    UPDATE_POSITION: "UPDATE_POSITION",
    LOAD_ELEVATION: "LOAD_ELEVATION",
    LOAD_SAFETY_ALTITUDE_LEVEL: "LOAD_SAFETY_ALTITUDE_LEVEL",
    DOWNLOAD_REPORT: "DOWNLOAD_REPORT",
    SWITCH_LANGUAGE: "SWITCH_LANGUAGE",
    TOGGLE_CADASTER: "TOGGLE_CADASTER",
    RESOLVE_POSITION_FROM_CADASTER: "RESOLVE_POSITION_FROM_CADASTER",
    RESET_ELEVATION_AND_SAFETY_LEVEL: "RESET_ELEVATION_AND_SAFETY_LEVEL",
    PUBLISH_MESSAGE: "PUBLISH_MESSAGE",
    DISMISS_MESSAGE: "DISMISS_MESSAGE"
};

export const AsyncStatus = {
    REQUEST: 0,
    SUCCESS: 1,
    FAILURE: 2
};

export default ActionType;
