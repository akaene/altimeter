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
import {injectIntl} from "react-intl";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import CadastralMapToggle from "./CadastralMapToggle";
import LanguageSelector from "./LanguageSelector";
import withI18n from "./withI18n";
import Constants from "../util/Constants";
import {connect} from "react-redux";
import {logout} from "../action/AsyncActions";

const Footer = props => {
    return <AppBar position="fixed" color="default" className="bottom-bar">
        <Toolbar>
            <Typography variant="subtitle2">
                &copy;
                {" " + new Date().getFullYear() + " AKAENE Partners s.r.o"}
            </Typography>
            <div style={{flexGrow: 1}}/>
            {props.loggedIn && <CadastralMapToggle/>}
            {props.loggedIn && process.env.REACT_APP_USE_AUTH === "true" &&
            <Button onClick={props.logout} className="footer-toggle">{props.i18n("logout")}</Button>}
            <LanguageSelector/>
            <Typography variant="subtitle2">{props.formatMessage("version", {version: Constants.VERSION})}</Typography>
        </Toolbar>
    </AppBar>;
};

export default connect(state => ({loggedIn: state.loggedIn}), dispatch => {
    return {
        logout: () => dispatch(logout())
    }
})(injectIntl(withI18n(Footer)));
