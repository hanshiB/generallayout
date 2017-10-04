// @flow
import { connect } from "react-redux";

import Application from "beinformed/modules/Application/Application";

import type { Connector } from "react-redux";
import type { ApplicationProps } from "beinformed/modules/Application/Application";

/**
 * Map state to props
 */
const mapStateToProps = (state: State) => ({
  application: state.application,
  locale: state.i18n.locale,
  renderLogin: state.login.inProgress
});

const connector: Connector<{}, ApplicationProps> = connect(mapStateToProps, {});

export default connector(Application);
