import React from "react";

export default function withI18n(Component) {
    class Wrapper extends React.Component {
        i18n = (id) => {
            return this.props.intl.messages[id] || ("{" + id + "}");
        };

        formatMessage = (msgId, values = {}) => {
            return this.props.intl.formatMessage({id: msgId}, values);
        };

        render() {
            return <Component i18n={this.i18n} formatMessage={this.formatMessage}
                              locale={this.props.intl.locale} {...this.props}/>;
        }
    }

    return Wrapper;
}
