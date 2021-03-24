import React, {Component} from "react";
import "./App.scss";
import {Provider} from "react-redux";
import AltimeterStore from "./store/AltimeterStore";
import IntlApp from "./IntlApp";

class App extends Component {
    render() {
        return <Provider store={AltimeterStore}>
            <IntlApp/>
        </Provider>;
    }
}

export default App;
