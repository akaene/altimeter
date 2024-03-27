import React from "react";
import {IntlProvider} from "react-intl";
import {connect} from "react-redux";
import Main from "./component/Main";
import Login from "./component/Login";
import {loadUser} from "./action/AsyncActions";
import {AppBar, Container, CssBaseline, Toolbar, Typography} from "@mui/material";
import Mask from "./component/Mask";
import Constants from "./util/Constants";
import companyLogo from "./asset/akaene-logo.png";
import Footer from "./component/Footer";
import Messages from "./component/message/Messages";

const IntlApp = (props) => {
    const {loggedIn, intl, loadUser} = props;
    React.useEffect(() => {
        loadUser();
    }, [loadUser]);
    let component;
    if (loggedIn === null) {
        component = <Container><Mask/></Container>;
    } else if (loggedIn) {
        component = <Main/>;
    } else {
        component = <Login/>;
    }
    return <IntlProvider {...intl}>
        <>
            <CssBaseline/>
            <AppBar color="default" position="relative">
                <Toolbar>
                    <Typography variant="h4">{Constants.APP_NAME}</Typography>
                    <div style={{flexGrow: 1}}/>
                    <a href="http://www.akaene.com" title="AKAENE Partners" target="_blank"
                       rel="noopener noreferrer">
                        <img src={companyLogo} className="company-logo" alt="Company logo"/>
                    </a>
                </Toolbar>
            </AppBar>
            <Messages/>
            {component}
            <Footer/>
        </>
    </IntlProvider>;
};

export default connect(state => ({intl: state.intl, loggedIn: state.loggedIn}), dispatch => {
    return {
        loadUser: () => dispatch(loadUser())
    };
})(IntlApp);
