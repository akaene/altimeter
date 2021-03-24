import {applyMiddleware, compose, createStore} from "redux";
import AltimeterReducers from "../reducer/altimeterReducers";
import logger from "redux-logger";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const AltimeterStore = createStore(AltimeterReducers, composeEnhancers(applyMiddleware(thunk, logger)));

export default AltimeterStore;
