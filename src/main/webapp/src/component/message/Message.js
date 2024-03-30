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
import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {dismissMessage} from "../../action/SyncActions";
import {Snackbar} from "@mui/material";
import withI18n from "../withI18n";

const Message = ({message, dismissMessage, i18n}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            dismissMessage(message);
        }, 1500);
        return () => clearTimeout(timer);
    }, [message, dismissMessage]);
    return <Snackbar
        anchorOrigin={{vertical: "top", horizontal: "right"}}
        key="message-bar"
        open={true}
        ContentProps={{
            'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message.messageId ? i18n(message.messageId) : message.message}</span>}
    />;
};

Message.propTypes = {
    message: PropTypes.object.isRequired,

    dismissMessage: PropTypes.func.isRequired
};

export default connect(null, dispatch => {
    return {
        dismissMessage: (message) => dispatch(dismissMessage(message))
    }
})(injectIntl(withI18n(Message)));
