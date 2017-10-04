// @flow
import { connect } from "react-redux";

import TabComponent from "beinformed/modules/TabComponent/TabComponent";

import type { Connector } from "react-redux";
import type { TabComponentProps } from "beinformed/modules/TabComponent/TabComponent";

/**
 * Get current active component
 */
const getActiveComponent = (state: State) => {
  if (state.caseview && state.caseview.casename) {
    return "caseview";
  } else if (state.tabcomponent) {
    return "rootlist";
  }

  return "none";
};

/**
 * Put active component
 */
const mapStateToProps = (state: State) => ({
  activeComponent: getActiveComponent(state)
});

const connector: Connector<{}, TabComponentProps> = connect(
  mapStateToProps,
  {}
);

export default connector(TabComponent);
