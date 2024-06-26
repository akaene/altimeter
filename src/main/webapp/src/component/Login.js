/*
 * Altimeter
 * Copyright (C) 2024 AKAENE Partners
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from "react";
import withI18n from "./withI18n";
import {injectIntl} from "react-intl";
import {Button, Card, Grid, CardActions, CardContent, CardHeader, Container, TextField, Typography} from "@mui/material";
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
