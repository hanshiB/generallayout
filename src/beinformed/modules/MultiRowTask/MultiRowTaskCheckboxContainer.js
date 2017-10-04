// @flow
import { connect } from "react-redux";

import { selectListItem } from "beinformed/modules/MultiRowTask/redux/MultiRowTaskActions";
import MultiRowTaskCheckbox from "beinformed/modules/MultiRowTask/MultiRowTaskCheckbox";

import type { Connector } from "react-redux";
import type { MultiRowTaskCheckboxProps } from "beinformed/modules/MultiRowTask/MultiRowTaskCheckbox";

type MultiRowTaskCheckboxContainerProps = {
  value: number | string
};

/**
 * Map state to props
 */
const mapStateToProps = (
  state: State,
  ownProps: MultiRowTaskCheckboxContainerProps
) => ({
  value: ownProps.value,
  isChecked: state.multirowtask.includes(ownProps.value)
});

const connector: Connector<
  MultiRowTaskCheckboxContainerProps,
  MultiRowTaskCheckboxProps
> = connect(mapStateToProps, {
  onChange: selectListItem
});

export default connector(MultiRowTaskCheckbox);
