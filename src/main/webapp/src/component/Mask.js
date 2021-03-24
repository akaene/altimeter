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
