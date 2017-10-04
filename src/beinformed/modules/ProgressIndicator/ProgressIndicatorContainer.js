// @flow
import { connect } from "react-redux";

import ProgressIndicator from "beinformed/modules/ProgressIndicator/ProgressIndicator";

import type { Connector } from "react-redux";
import type { ProgressIndicatorProps } from "beinformed/modules/ProgressIndicator/ProgressIndicator";

/**
 * Map state to props
 */
const mapStateToProps = (state: State) => ({
  count: state.progressindicator.count,
  timestamp: state.progressindicator.timestamp,
  percentComplete: state.progressindicator.percentComplete
});

const connector: Connector<{}, ProgressIndicatorProps> = connect(
  mapStateToProps,
  {}
);

export default connector(ProgressIndicator);
