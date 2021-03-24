import React from "react";
import withI18n from "./withI18n";
import {injectIntl} from "react-intl";
import Grid from "@material-ui/core/Grid";
import {Button, Card, CardActions, CardContent, CardHeader, Container, TextField, Typography} from "@material-ui/core";
import {login} from "../action/AsyncActions";
import {connect} from "react-redux";
import "./Login.scss";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
    }

    onChange = (e) => {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onSubmit();
        }
    }

    onSubmit = () => {
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        const i18n = this.props.i18n;
        return <Container maxWidth="sm">
            <Card className="login-container">
                <CardHeader title={i18n("login.title")}/>
                <CardContent>
                    <Grid container alignItems={"center"} className="login-row">
                        <Grid item xs={4}>
                            <Typography variant="subtitle2">{i18n("login.username")}</Typography>
                        </Grid>
                        <Grid item xs={8} className="login-input">
                            <TextField id="login-username" name="username" variant="outlined"
                                       value={this.state.username} onChange={this.onChange}
                                       onKeyPress={this.onKeyPress}/>
                        </Grid>
                    </Grid>
                    <Grid container alignItems={"center"} className="login-row">
                        <Grid item xs={4}>
                            <Typography variant="subtitle2">{this.props.i18n("login.password")}</Typography>
                        </Grid>
                        <Grid item xs={8} className="login-input">
                            <TextField id="login-password" name="password" type="password" variant="outlined"
                                       value={this.state.password} onChange={this.onChange}
                                       onKeyPress={this.onKeyPress}/>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions className="login-actions">
                    <Grid item>
                        <Button onClick={this.onSubmit} color="primary"
                                variant="contained">{i18n("login.submit")}</Button>
                    </Grid>
                </CardActions>
            </Card>
        </Container>;
    }
}

export default connect(undefined, dispatch => {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
})(injectIntl(withI18n(Login)));
