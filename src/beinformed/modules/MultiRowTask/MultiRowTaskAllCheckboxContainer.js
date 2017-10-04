// @flow
import { connect } from "react-redux";

import { selectAllListItems } from "beinformed/modules/MultiRowTask/redux/MultiRowTaskActions";
import MultiRowTaskAllCheckbox from "beinformed/modules/MultiRowTask/MultiRowTaskAllCheckbox";

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps) => ({
  value: ownProps.values,
  isChecked: state.multirowtask.length === ownProps.values.length
});

export default connect(mapStateToProps, {
  onChange: selectAllListItems
})(MultiRowTaskAllCheckbox);
