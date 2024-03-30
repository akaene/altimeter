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
import * as PropTypes from "prop-types";
import classNames from "classnames";
import {ClipLoader} from "react-spinners";
import {injectIntl} from "react-intl";
import withI18n from "./withI18n";
import "./Mask.scss";

const Mask = (props) => {
    const containerClasses = classNames("spinner-container", {"without-text": props.withoutText});
    const text = props.text ? props.text : props.i18n("please-wait");
    return <div className={props.classes ? props.classes : "mask"}>
        <div className={containerClasses}>
            <div style={{width: 32, height: 32, margin: "auto"}}>
                <ClipLoader color="#337ab7" size={32}/>
            </div>
            {!props.withoutText && <div className="spinner-message">{text}</div>}
        </div>
    </div>;
};

Mask.propTypes = {
    text: PropTypes.string,
    classes: PropTypes.string,
    withoutText: PropTypes.bool
};

Mask.defaultProps = {
    classes: "mask",
    withoutText: false
};

export default injectIntl(withI18n(Mask));
