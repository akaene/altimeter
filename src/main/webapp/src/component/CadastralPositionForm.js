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
import {Button, Grid, TextField, Typography} from "@mui/material";
import withI18n from "./withI18n";
import {injectIntl} from "react-intl";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {resolvePositionFromCadaster} from "../action/AsyncActions";
import {resetElevationAndSafetyLevelData, updatePosition} from "../action/SyncActions";
import Mask from "./Mask";

export class CadastralPositionForm extends React.Component {

    static propTypes = {
        updatePosition: PropTypes.func.isRequired,
        resolvePosition: PropTypes.func.isRequired,
        resetResults: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            cadastralArea: "",
            parcel: "",
            loading: false
        };
    }

    onAreaChange = (e) => {
        this.setState({cadastralArea: e.target.value});
        this.props.resetResults();
    };

    onParcelChange = (e) => {
        this.setState({parcel: e.target.value});
        this.props.resetResults();
    };

    onKeyPress = (e) => {
        if (e.key === "Enter" && this.dataValid()) {
            this.resolvePositionFromCadaster();
        }
    };

    resolvePositionFromCadaster = () => {
        this.setState({loading: true});
        this.props.resolvePosition(this.state.cadastralArea.trim(), this.state.parcel.trim()).then(() => this.setState({loading: false}));
    };

    dataValid() {
        return this.state.cadastralArea.trim().length > 0 && this.state.parcel.trim().length > 0;
    }

    render() {
        return <Grid item xs={12}>
            {this.state.loading && <Mask text={this.props.i18n("datapane.resolvePositionFromCadaster.pleaseWait")}/>}
            <Grid container alignItems={"center"} className="datapane-row">
                <Grid item xs={4}>
                    <Typography variant="subtitle2">{this.props.i18n("datapane.cadastralArea")}</Typography>
                </Grid>
                <Grid item xs={8} className="datapane-value">
                    <TextField id="datapane-cadastralArea" type="text" variant="outlined"
                               value={this.state.cadastralArea}
                               onChange={this.onAreaChange} onKeyPress={this.onKeyPress}/>
                </Grid>
            </Grid>
            <Grid container alignItems={"center"} className="datapane-row">
                <Grid item xs={4}>
                    <Typography variant="subtitle2">{this.props.i18n("datapane.parcel")}</Typography>
                </Grid>
                <Grid item xs={8} className="datapane-value">
                    <TextField id="datapane-parcel" type="text" variant="outlined"
                               value={this.state.parcel} onChange={this.onParcelChange} onKeyPress={this.onKeyPress}/>
                </Grid>
            </Grid>
            <Grid container justify="flex-end" className="datapane-row">
                <Button color="primary" variant="contained" disabled={!this.dataValid()}
                        onClick={this.resolvePositionFromCadaster}>{this.props.i18n("datapane.resolvePositionFromCadaster")}</Button>
            </Grid>
        </Grid>;
    }
}

export default connect(undefined, dispatch => {
    return {
        resolvePosition: (area, parcel) => dispatch(resolvePositionFromCadaster(area, parcel)),
        updatePosition: (lat, long) => dispatch(updatePosition(lat, long)),
        resetResults: () => dispatch(resetElevationAndSafetyLevelData())
    };
})(injectIntl(withI18n(CadastralPositionForm)));

