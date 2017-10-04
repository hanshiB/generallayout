// @flow
import { connect } from "react-redux";

import { startAction } from "beinformed/modules/Action/redux/ActionActions";
import Action from "beinformed/modules/Action/Action";

import type { Connector } from "react-redux";
import type { ActionProps } from "beinformed/modules/Action/Action";
import type ActionModel from "beinformed/models/actions/ActionModel";

type ActionContainerProps = {
  action: ActionModel,
  isButton?: boolean,
  isPrimary?: boolean,
  isDropdown?: boolean
};

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps: ActionContainerProps) => ({
  ...ownProps
});

const connector: Connector<
  ActionContainerProps,
  ActionProps
> = connect(mapStateToProps, {
  onActionClick: startAction
});

export default connector(Action);
