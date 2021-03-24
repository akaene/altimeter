import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Message from "./Message";

const Messages = (props) => {
    const count = props.messages.length;
    if (count > 0) {
        return <Message message={props.messages[0]}/>
    } else {
        return null;
    }
};

Messages.propTypes = {
    messages: PropTypes.array.isRequired
};

export default connect((state) => {
    return {
        messages: state.messages
    };
})(Messages);
