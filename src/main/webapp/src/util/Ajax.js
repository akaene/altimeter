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
import axios from "axios";
import Constants, {getEnv} from "./Constants";

const axiosInstance = axios.create({
    baseURL: Constants.SERVER_URL,
    withCredentials: getEnv("USE_AUTH", "false") === "true"
});

axiosInstance.interceptors.response.use(undefined, error => {
    if (!error.response) {
        return Promise.reject({
            message: error.message ? error.message : undefined,
            messageId: "connection.error"
        });
    }
    const response = error.response;
    if (typeof response.data === "string") {
        return Promise.reject({
            messageId: "ajax.unparseable-error",
            status: response.status
        });
    } else {
        return Promise.reject(Object.assign({}, response.data, {status: response.status}));
    }
});

export default axiosInstance;
