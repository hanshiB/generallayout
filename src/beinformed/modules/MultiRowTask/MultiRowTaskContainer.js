// @flow
import { connect } from "react-redux";

import { startMultiAction } from "beinformed/modules/MultiRowTask/redux/MultiRowTaskActions";
import MultiRowTask from "beinformed/modules/MultiRowTask/MultiRowTask";

import type { Connector } from "react-redux";
import type { MultiRowTaskProps } from "beinformed/modules/MultiRowTask/MultiRowTask";
import type ActionCollection from "beinformed/models/actions/ActionCollection";

type MultiRowTaskContainerProps = {
  actions: ActionCollection
};

/**
 * Map state to props
 */
const mapStateToProps = (
  state: State,
  ownProps: MultiRowTaskContainerProps
) => ({
  selectedItemIds: state.multirowtask,
  actions: ownProps.actions
});

const connector: Connector<
  MultiRowTaskContainerProps,
  MultiRowTaskProps
> = connect(mapStateToProps, {
  onClick: startMultiAction
});

export default connector(MultiRowTask);
