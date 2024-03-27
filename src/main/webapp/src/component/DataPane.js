import React from "react";
import {Grid} from "@mui/material";
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
