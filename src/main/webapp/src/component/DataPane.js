import React from "react";
import Grid from "@material-ui/core/Grid";
import "./DataPane.scss";
import SafetyLevelInfo from "./SafetyLevelInfo";
import InputDataPane from "./InputDataPane";

const DataPane = () => {
    return <div>
        <Grid container>
            <InputDataPane/>
            <SafetyLevelInfo/>
        </Grid>
    </div>;
};

export default DataPane;
