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
import {Button, Menu, MenuItem} from "@mui/material";
import {ArrowDropDown} from "@mui/icons-material";
import Constants from "../util/Constants";
import {connect} from "react-redux";
import {switchLanguage} from "../action/SyncActions";


class LanguageSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }

    _openSelector = (e) => {
        this.setState({anchorEl: e.currentTarget})
    };

    _closeSelector = () => {
        this.setState({anchorEl: null});
    };

    selectLanguage = (lang) => {
        this.props.switchLanguage(lang);
        this._closeSelector();
    };

    resolveSelectedLanguage() {
        const selected = Object.getOwnPropertyNames(Constants.LANG).find(p => Constants.LANG[p].locale === this.props.language);
        return Constants.LANG[selected];
    }

    render() {
        const selected = this.resolveSelectedLanguage();
        return <div className="footer-toggle">
            <Button aria-owns={this.state.anchorEl ? "language-selector" : undefined}
                    aria-haspopup="true" onClick={this._openSelector}>{selected.label}<ArrowDropDown/></Button>
            <Menu id="language-selector" anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)}
                  onClose={this._closeSelector}>
                {Object.getOwnPropertyNames(Constants.LANG).map(k => {
                    const lang = Constants.LANG[k];
                    return <MenuItem key={lang.locale} id={"language-selector." + lang.locale}
                                     selected={selected.locale === lang.locale}
                                     onClick={() => this.selectLanguage(lang.locale)}>{lang.label}</MenuItem>;
                })}
            </Menu>
        </div>
    }
}

export default connect(state => ({language: state.intl.locale}), dispatch => {
    return {
        switchLanguage: (lang) => dispatch(switchLanguage(lang))
    };
})(LanguageSelector);
