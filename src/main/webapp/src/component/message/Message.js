import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {dismissMessage} from "../../action/SyncActions";
import {Snackbar} from "@material-ui/core";
import withI18n from "../withI18n";

const Message = props => {
    const message = props.message;
    useEffect(() => {
        const timer = setTimeout(() => {
            props.dismissMessage(message);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);
    return <Snackbar
        anchorOrigin={{vertical: "top", horizontal: "right"}}
        key="message-bar"
        open={true}
        ContentProps={{
            'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message.messageId ? props.i18n(message.messageId) : message.message}</span>}
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
