import React from "react";
import {Grid, TextField, Typography} from "@mui/material";
import withI18n from "./withI18n";
import {injectIntl} from "react-intl";
import "./DataPane.scss";
import * as PropTypes from "prop-types";


class DecimalPositionForm extends React.Component {

    static propTypes = {
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        updatePosition: PropTypes.func.isRequired,
        runPositionSafetyCheck: PropTypes.func.isRequired
    };

    onLatChange = (e) => {
        const val = Number(e.target.value);
        this.props.updatePosition(val, this.props.longitude);
    };

    onLongChange = (e) => {
        const val = Number(e.target.value);
        this.props.updatePosition(this.props.latitude, val);
    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.props.runPositionSafetyCheck();
        }
    };

    render() {
        return <Grid item xs={12}>
            <Grid container alignItems={"center"} className="datapane-row">
                <Grid item xs={4}>
                    <Typography variant="subtitle2">{this.props.i18n("datapane.latitude")}</Typography>
                </Grid>
                <Grid item xs={8} className="datapane-value">
                    <TextField id="datapane-latitude" type="number" variant="outlined"
                               value={this.props.latitude} inputProps={{step: 0.01}}
                               onChange={this.onLatChange} onKeyPress={this.onKeyPress}/>
                </Grid>
            </Grid>
            <Grid container alignItems={"center"} className="datapane-row">
                <Grid item xs={4}>
                    <Typography variant="subtitle2">{this.props.i18n("datapane.longitude")}</Typography>
                </Grid>
                <Grid item xs={8} className="datapane-value">
                    <TextField id="datapane-longitude" type="number" variant="outlined"
                               value={this.props.longitude} inputProps={{step: 0.01}}
                               onChange={this.onLongChange} onKeyPress={this.onKeyPress}/>
                </Grid>
            </Grid>
        </Grid>;
    }
}

export default injectIntl(withI18n(DecimalPositionForm));
