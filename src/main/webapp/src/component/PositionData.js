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
