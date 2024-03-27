import React, {useState} from "react";
import {injectIntl} from "react-intl";
import {Box, Grid, Tab, Tabs, Typography} from "@mui/material";
import withI18n from "./withI18n";
import PositionData from "./PositionData";
import CadastralPositionForm from "./CadastralPositionForm";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className="w-100"
        {...other}
    >
        <Box pt={3} width="100%">{children}</Box>
    </Typography>;
}

export const InputDataPane = props => {
    const [selectedTab, selectTab] = useState(0);

    return <Grid container>
        <Tabs value={selectedTab} onChange={(e, newValue) => selectTab(newValue)} variant="fullWidth" centered
              indicatorColor="primary" textColor="primary" className="w-100">
            <Tab label={props.i18n("datapane.inputtype.cadaster")}/>
            <Tab label={props.i18n("datapane.inputtype.position")}/>
        </Tabs>
        <Grid container>
            <TabPanel value={selectedTab} index={0}>
                <CadastralPositionForm/>
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <PositionData/>
            </TabPanel>
        </Grid>
    </Grid>;
};

export default injectIntl(withI18n(InputDataPane));
