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
