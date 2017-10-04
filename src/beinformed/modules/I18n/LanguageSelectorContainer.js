// @flow
import { connect } from "react-redux";

import { updateLocale } from "beinformed/modules/I18n/redux/I18nActions";
import LanguageSelector from "beinformed/modules/I18n/LanguageSelector";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  activeLocale: state.i18n.locale,
  locales: state.i18n.locales
});

export default connect(mapStateToProps, {
  onChange: updateLocale
})(LanguageSelector);
