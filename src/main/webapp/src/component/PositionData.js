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
import {connect} from "react-redux";
import {FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography} from "@mui/material";
import withI18n from "./withI18n";
import {injectIntl} from "react-intl";
import "./DataPane.scss";
import * as PropTypes from "prop-types";
import DecimalPositionForm from "./DecimalPositionForm";
import DegMinSecPositionForm from "./DegMinSecPositionForm";
import {updatePosition} from "../action/SyncActions";
import {loadSafetyAltitudeLevel} from "../action/AsyncActions";

class PositionData extends React.Component {

    static propTypes = {
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        updatePosition: PropTypes.func.isRequired,
        runPositionSafetyCheck: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            positionInputType: "decimal"
        };
    }

    _onPositionInputTypeChange = (e) => {
        this.setState({positionInputType: e.target.value});
    };

    onPositionChange = (latitude, longitude) => {
        this.props.updatePosition(latitude, longitude);
    };

    onRunPositionSafetyCheck = () => {
        this.props.runPositionSafetyCheck(this.props.latitude, this.props.longitude);
    };

    render() {
        const i18n = this.props.i18n;
        return <>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>{i18n("datapane.position.title")}</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset" className="position-input-type">
                    <RadioGroup aria-label="position-input-type" name="positionInputType"
                                value={this.state.positionInputType} onChange={this._onPositionInputTypeChange}>
                        <Grid container>
                            <Grid item xs={6}>
                                <FormControlLabel value="decimal" control={<Radio color="primary"/>}
                                                  label={i18n("datapane.position.inputType.decimal")}/>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel value="degMinSec" control={<Radio color="primary"/>}
                                                  label={i18n("datapane.position.inputType.degMinSec")}/>
                            </Grid>
                        </Grid>
                    </RadioGroup>
                </FormControl>
            </Grid>
            {this.state.positionInputType === "decimal" ? <DecimalPositionForm
                    latitude={this.props.latitude}
                    longitude={this.props.longitude}
                    updatePosition={this.onPositionChange} runPositionSafetyCheck={this.onRunPositionSafetyCheck}/> :
                <DegMinSecPositionForm latitude={this.props.latitude} longitude={this.props.longitude}
                                       updatePosition={this.onPositionChange}
                                       runPositionSafetyCheck={this.onRunPositionSafetyCheck}/>}
        </>;
    }
}

export default connect(state => ({latitude: state.latitude, longitude: state.longitude}), dispatch => {
    return {
        updatePosition: (lat, long) => dispatch(updatePosition(lat, long)),
        runPositionSafetyCheck: (lat, long) => dispatch(loadSafetyAltitudeLevel(lat, long))
    };
})(injectIntl(withI18n(PositionData)));
