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
const en = {
    locale: "en",
    messages: {
        "please-wait": "Please wait...",
        "footer.toggleCadastralMap": "Display cadastral map",
        "datapane.inputtype.cadaster": "Cadastre",
        "datapane.inputtype.position": "Position data",
        "datapane.position.title": "Position Data",
        "datapane.position.inputType.decimal": "Decimal",
        "datapane.position.inputType.degMinSec": "Degrees, Minutes, Seconds",
        "datapane.position.runCheck": "Verify",
        "datapane.position.runCheck.invalid.tooltip": "Enter valid position to enable",
        "datapane.latitude": "Latitude",
        "datapane.longitude": "Longitude",
        "datapane.elevation": "Surface elevation",
        "datapane.cadastralArea": "Cadastral area",
        "datapane.parcel": "Parcel no.",
        "datapane.resolvePositionFromCadaster": "Resolve parcel position",
        "datapane.resolvePositionFromCadaster.pleaseWait": "Resolving parcel position...",
        "datapane.safetylevel.title": "Vertical Obstacle Data",
        "datapane.safetylevel.maxObstacleHeight": "Maximum obstacle height",
        "datapane.safetylevel.maxObstacleHeight.unlimited": "Not limited by the system.",
        "datapane.safetyLevel.safetyZone": "Determining safety zone",
        "datapane.print": "Printable protocol",
        "datapane.print.pleaseWait": "Generating protocol...",

        "error.cadastre.parcelNotFound": "Parcel not found.",
        "error.position.outOfBounds": "Position out of bounds of the system.",

        "login.title": "Log in",
        "login.username": "Username",
        "login.password": "Password",
        "login.submit": "Log in",
        "login.failure": "Login failed. Wrong credentials?",
        "logout": "Log out",

        "version": "Version: {version}"
    }
};

export default en;
