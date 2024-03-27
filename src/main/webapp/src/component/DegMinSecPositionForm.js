import React from "react";
import {Grid, InputAdornment, TextField, Typography} from "@mui/material";
import withI18n from "./withI18n";
import {injectIntl} from "react-intl";
import "./DataPane.scss";
import * as PropTypes from "prop-types";
import Utils from "../util/Utils";

function toDecimalDegree(value) {
    return value.deg + value.min / 60 + value.sec / 3600;
}

function toDegMinSec(value) {
    let tmp = value;
    const deg = Math.floor(value);
    tmp = (tmp - deg) * 60;
    const min = Math.floor(tmp);
    const sec = Utils.round((tmp - min) * 60, 2);
    return {deg, min, sec};
}

class DegMinSecPositionForm extends React.Component {

    static propTypes = {
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        updatePosition: PropTypes.func.isRequired,
        runPositionSafetyCheck: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            latitude: toDegMinSec(this.props.latitude),
            longitude: toDegMinSec(this.props.longitude)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.latitude !== this.props.latitude || prevProps.longitude !== this.props.longitude) {
            this.setState({
                latitude: toDegMinSec(this.props.latitude),
                longitude: toDegMinSec(this.props.longitude)
            });
        }
    }

    onLatDegChange = (e) => {
        const val = Number(e.target.value);
        const newLat = Object.assign({}, this.state.latitude, {deg: val});
        this.setState({latitude: newLat});
        this.props.updatePosition(toDecimalDegree(newLat), this.props.longitude);
    };

    onLatMinChange = (e) => {
        const val = Number(e.target.value);
        const newLat = Object.assign({}, this.state.latitude, {min: val});
        this.setState({latitude: newLat});
        this.props.updatePosition(toDecimalDegree(newLat), this.props.longitude);
    };

    onLatSecChange = (e) => {
        const newLat = Object.assign({}, this.state.latitude, {sec: DegMinSecPositionForm._extractRoundedValue(e)});
        this.setState({latitude: newLat});
        this.props.updatePosition(toDecimalDegree(newLat), this.props.longitude);
    };

    static _extractRoundedValue(e) {
        return Utils.round(Number(e.target.value));
    }

    onLongDegChange = (e) => {
        const val = Number(e.target.value);
        const newLong = Object.assign({}, this.state.longitude, {deg: val});
        this.setState({longitude: newLong});
        this.props.updatePosition(this.props.latitude, toDecimalDegree(newLong));
    };

    onLongMinChange = (e) => {
        const val = Number(e.target.value);
        const newLong = Object.assign({}, this.state.longitude, {min: val});
        this.setState({longitude: newLong});
        this.props.updatePosition(this.props.latitude, toDecimalDegree(newLong));
    };

    onLongSecChange = (e) => {
        const newLong = Object.assign({}, this.state.longitude, {sec: DegMinSecPositionForm._extractRoundedValue(e)});
        this.setState({longitude: newLong});
        this.props.updatePosition(this.props.latitude, toDecimalDegree(newLong));
    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.props.runPositionSafetyCheck();
        }
    };

    render() {
        return <Grid item xs={12}>
            <Grid container alignItems={"center"} className="datapane-row">
                <Grid item xs={3} lg={3}>
                    <Typography variant="subtitle2">{this.props.i18n("datapane.latitude")}</Typography>
                </Grid>
                <Grid item xs={3} lg={3} className="datapane-value position-deg-min-sec">
                    <TextField id="datapane-latitude-deg" type="number" variant="outlined"
                               value={this.state.latitude.deg} InputProps={{
                        step: 1,
                        endAdornment: <InputAdornment position="end">&deg;</InputAdornment>
                    }}
                               onChange={this.onLatDegChange} onKeyPress={this.onKeyPress}/>
                </Grid>
                <Grid item xs={3} lg={3} className="datapane-value position-deg-min-sec">
                    <TextField id="datapane-latitude-min" type="number" variant="outlined"
                               value={this.state.latitude.min} InputProps={{
                        step: 1,
                        endAdornment: <InputAdornment position="end">&prime;</InputAdornment>
                    }}
                               onChange={this.onLatMinChange} onKeyPress={this.onKeyPress}/>
                </Grid>
                <Grid item xs={3} lg={3} className="datapane-value position-deg-min-sec">
                    <TextField id="datapane-latitude-sec" type="number" variant="outlined"
                               value={this.state.latitude.sec} InputProps={{
                        step: 0.01,
                        endAdornment: <InputAdornment position="end">&Prime;</InputAdornment>
                    }}
                               onChange={this.onLatSecChange} onKeyPress={this.onKeyPress}/>
                </Grid>
            </Grid>
            <Grid container alignItems={"center"} className="datapane-row">
                <Grid item xs={3} lg={3}>
                    <Typography variant="subtitle2">{this.props.i18n("datapane.longitude")}</Typography>
                </Grid>
                <Grid item xs={3} lg={3} className="datapane-value position-deg-min-sec">
                    <TextField id="datapane-longitude-deg" type="number" variant="outlined"
                               value={this.state.longitude.deg} InputProps={{
                        step: 1,
                        endAdornment: <InputAdornment position="end">&deg;</InputAdornment>
                    }}
                               onChange={this.onLongDegChange} onKeyPress={this.onKeyPress}/>
                </Grid>
                <Grid item xs={3} lg={3} className="datapane-value position-deg-min-sec">
                    <TextField id="datapane-longitude-min" type="number" variant="outlined"
                               value={this.state.longitude.min} InputProps={{
                        step: 1,
                        endAdornment: <InputAdornment position="end">&prime;</InputAdornment>
                    }}
                               onChange={this.onLongMinChange} onKeyPress={this.onKeyPress}/>
                </Grid>
                <Grid item xs={3} lg={3} className="datapane-value position-deg-min-sec">
                    <TextField id="datapane-longitude-sec" type="number" variant="outlined"
                               value={this.state.longitude.sec} InputProps={{
                        step: 0.01,
                        endAdornment: <InputAdornment position="end">&Prime;</InputAdornment>
                    }}
                               onChange={this.onLongSecChange} onKeyPress={this.onKeyPress}/>
                </Grid>
            </Grid>
        </Grid>;
    }
}

export default injectIntl(withI18n(DegMinSecPositionForm));
