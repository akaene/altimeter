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
