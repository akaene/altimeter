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
import {FormControlLabel, Switch} from "@mui/material";
import {injectIntl} from "react-intl";
import withI18n from "./withI18n";
import {connect} from "react-redux";
import {toggleCadastralMap} from "../action/SyncActions";

const CadastralMapToggle = (props) => {
    return <div className="footer-toggle">
        <FormControlLabel control={<Switch checked={props.displayCadastralMap}
                         onChange={props.toggleCadastralMap}
                         value="displayCadastralMap"
                         color="primary"/>
        }
        label={props.i18n("footer.toggleCadastralMap")} labelPlacement="start"/>
    </div>;
};

export default connect(state => ({displayCadastralMap: state.cadastralMap}), dispatch => {
    return {
        toggleCadastralMap: () => dispatch(toggleCadastralMap())
    }
})(injectIntl(withI18n(CadastralMapToggle)));
