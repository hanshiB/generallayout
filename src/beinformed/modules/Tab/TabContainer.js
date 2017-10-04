// @flow
import { connect } from "react-redux";

import Tab from "beinformed/modules/Tab/Tab";

import type { Connector } from "react-redux";
import type { TabProps } from "beinformed/modules/Tab/Tab";

/**
 * Map state to props
 */
const mapStateToProps = (state: State) => ({
  tab: state.tab
});

const connector: Connector<{}, TabProps> = connect(mapStateToProps, {});

export default connector(Tab);
