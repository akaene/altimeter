import React from "react";
import {connect} from "react-redux";
import {Button, Grid, Typography} from "@mui/material";
import withI18n from "./withI18n";
import {injectIntl} from "react-intl";
import "./DataPane.scss";
import * as PropTypes from "prop-types";
import {Print as PrintIcon} from "@mui/icons-material";
import Utils from "../util/Utils";
import Mask from "./Mask";
import {downloadReport, loadSafetyAltitudeLevel} from "../action/AsyncActions";

class SafetyLevelInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingReport: false
        };
    }

    onRunPositionSafetyCheck = () => {
        this.props.runPositionSafetyCheck(this.props.latitude, this.props.longitude);
    };

    _onDownloadReport = () => {
        this.setState({loadingReport: true});
        this.props.downloadReport().then(() => this.setState({loadingReport: false}));
    };

    render() {
        const i18n = this.props.i18n;
        return <>
            {this.state.loadingReport && <Mask text={i18n("datapane.print.pleaseWait")}/>}
            <Grid container alignItems={"center"} className="datapane-row">
                <Grid item xs={12}>
                    <hr/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>{i18n("datapane.safetylevel.title")}</Typography>
                </Grid>
                {this.props.elevation <= 0 ? this._renderSubmitButton() : this._renderSafetyLevelInfo()}
            </Grid>
        </>;
    }

    _renderSubmitButton() {
        const i18n = this.props.i18n;
        const positionValid = Utils.isPositionValid(this.props.latitude, this.props.longitude);
        return <Grid container alignItems="center" justify="flex-end" className="datapane-row">
            <Button color="primary" variant="contained" disabled={!positionValid}
                    title={positionValid ? undefined : i18n("datapane.position.runCheck.invalid.tooltip")}
                    onClick={this.onRunPositionSafetyCheck}>{i18n("datapane.position.runCheck")}</Button>
        </Grid>;
    }

    _renderSafetyLevelInfo() {
        const i18n = this.props.i18n;
        return <>
            <Grid container alignItems={"center"} className="datapane-row">
                <Grid item xs={4}>
                    <Typography variant="subtitle2">{i18n("datapane.elevation")}</Typography>
                </Grid>
                <Grid item xs={8} className="datapane-value">
                    <Typography>{Utils.round(this.props.elevation)}&nbsp;m</Typography>
                </Grid>
            </Grid>
            <Grid container alignItems={"center"} className="datapane-row">
                <Grid item xs={4}>
                    <Typography variant="subtitle2">{i18n("datapane.safetylevel.maxObstacleHeight")}</Typography>
                </Grid>
                <Grid item xs={8} className="datapane-value">
                    {this._renderMaxObstacleHeight()}
                </Grid>
            </Grid>
            {this._renderSafetyZone()}
            <Grid container alignItems="center" justify="flex-end" className="datapane-row">
                <Button color="primary" variant="contained"
                        onClick={this._onDownloadReport}><PrintIcon/>&nbsp;{i18n("datapane.print")}</Button>
            </Grid>
        </>;
    }

    _renderMaxObstacleHeight() {
        if (this.props.maxObstacleHeight === Number.MAX_VALUE) {
            return <Typography>{this.props.i18n("datapane.safetylevel.maxObstacleHeight.unlimited")}</Typography>
        }
        return <Typography>{Utils.round(this.props.maxObstacleHeight)}&nbsp;m</Typography>
    }

    _renderSafetyZone() {
        if (!this.props.safetyZone) {
            return null;
        }
        return <Grid container alignItems={"center"} className="datapane-row">
            <Grid item xs={4}>
                <Typography variant="subtitle2">{this.props.i18n("datapane.safetyLevel.safetyZone")}</Typography>
            </Grid>
            <Grid item xs={8} className="datapane-value">
                <Typography>{this.props.safetyZone}</Typography>
            </Grid>
        </Grid>
    }
}

SafetyLevelInfo.propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    elevation: PropTypes.number,
    safetyAltitudeLevel: PropTypes.number,
    maxObstacleHeight: PropTypes.number,
    safetyZone: PropTypes.string,

    downloadReport: PropTypes.func.isRequired,
    runPositionSafetyCheck: PropTypes.func.isRequired
};

export default connect(state => ({
    latitude: state.latitude,
    longitude: state.longitude,
    elevation: state.elevation,
    safetyAltitudeLevel: state.safetyAltitudeLevel,
    maxObstacleHeight: state.maxObstacleHeight,
    safetyZone: state.safetyZone
}), dispatch => {
    return {
        downloadReport: () => dispatch(downloadReport()),
        runPositionSafetyCheck: (lat, long) => dispatch(loadSafetyAltitudeLevel(lat, long))
    }
})(injectIntl(withI18n(SafetyLevelInfo)));
