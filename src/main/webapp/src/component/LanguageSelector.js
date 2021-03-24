import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Constants from "../util/Constants";
import {connect} from "react-redux";
import {switchLanguage} from "../action/SyncActions";

class LanguageSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }

    _openSelector = (e) => {
        this.setState({anchorEl: e.currentTarget})
    };

    _closeSelector = () => {
        this.setState({anchorEl: null});
    };

    selectLanguage = (lang) => {
        this.props.switchLanguage(lang);
        this._closeSelector();
    };

    resolveSelectedLanguage() {
        const selected = Object.getOwnPropertyNames(Constants.LANG).find(p => Constants.LANG[p].locale === this.props.language);
        return Constants.LANG[selected];
    }

    render() {
        const selected = this.resolveSelectedLanguage();
        return <div className="footer-toggle">
            <Button aria-owns={this.state.anchorEl ? "language-selector" : undefined}
                    aria-haspopup="true" onClick={this._openSelector}>{selected.label}<ArrowDropDownIcon/></Button>
            <Menu id="language-selector" anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)}
                  onClose={this._closeSelector}>
                {Object.getOwnPropertyNames(Constants.LANG).map(k => {
                    const lang = Constants.LANG[k];
                    return <MenuItem key={lang.locale} id={"language-selector." + lang.locale}
                                     selected={selected.locale === lang.locale}
                                     onClick={() => this.selectLanguage(lang.locale)}>{lang.label}</MenuItem>;
                })}
            </Menu>
        </div>
    }
}

export default connect(state => ({language: state.intl.locale}), dispatch => {
    return {
        switchLanguage: (lang) => dispatch(switchLanguage(lang))
    };
})(LanguageSelector);
