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
