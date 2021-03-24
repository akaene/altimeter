import React from "react";
import {IntlProvider} from "react-intl";
import {connect} from "react-redux";
import Main from "./component/Main";
import Login from "./component/Login";
import {loadUser} from "./action/AsyncActions";
import {AppBar, Container, Toolbar, Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Mask from "./component/Mask";
import Constants from "./util/Constants";
import companyLogo from "./asset/akaene-logo.png";
import ctuLogo from "./asset/cvut-logo.png";
import lkprLogo from "./asset/prgaero-logo.png";
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
                    <a href="https://www.cvut.cz" title="ČVUT v Praze" target="_blank" rel="noopener noreferrer">
                        <img src={ctuLogo} className="partner-logo" alt="CTU in Prague logo"/>
                    </a>
                    <a href="https://www.prg.aero/" title="Letiště Praha" target="_blank" rel="noopener noreferrer">
                        <img src={lkprLogo} className="partner-logo" alt="Prague Airport logo"/>
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
