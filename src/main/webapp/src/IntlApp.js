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
import React from "react";
import {IntlProvider} from "react-intl";
import {connect} from "react-redux";
import Main from "./component/Main";
import Login from "./component/Login";
import {loadUser} from "./action/AsyncActions";
import {AppBar, Container, CssBaseline, Toolbar, Typography} from "@mui/material";
import Mask from "./component/Mask";
import Constants from "./util/Constants";
import companyLogo from "./asset/akaene-logo.png";
import Footer from "./component/Footer";
import Messages from "./component/message/Messages";

const IntlApp = (props) => {
    const {loggedIn, intl, loadUser} = props;
    React.useEffect(() => {
        loadUser();
    }, [loadUser]);
    let component;
    if (loggedIn === null) {
        component = <Container><Mask/></Container>;
    } else if (loggedIn) {
        component = <Main/>;
    } else {
        component = <Login/>;
    }
    return <IntlProvider {...intl}>
        <>
            <CssBaseline/>
            <AppBar color="default" position="relative">
                <Toolbar>
                    <Typography variant="h4">{Constants.APP_NAME}</Typography>
                    <div style={{flexGrow: 1}}/>
                    <a href="http://www.akaene.com" title="AKAENE Partners" target="_blank"
                       rel="noopener noreferrer">
                        <img src={companyLogo} className="company-logo" alt="Company logo"/>
                    </a>
                </Toolbar>
            </AppBar>
            <Messages/>
            {component}
            <Footer/>
        </>
    </IntlProvider>;
};

export default connect(state => ({intl: state.intl, loggedIn: state.loggedIn}), dispatch => {
    return {
        loadUser: () => dispatch(loadUser())
    };
})(IntlApp);
