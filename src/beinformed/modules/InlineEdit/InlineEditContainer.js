// @flow
import { connect } from "react-redux";

import {
  startProgress,
  finishProgress
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";
import { gotoListItem } from "beinformed/modules/List/redux/ListActions";
import { startAction } from "beinformed/modules/Action/redux/ActionActions";
import {
  updateEditableListAttribute,
  saveEditableListItem,
  cancelEditableListItem
} from "beinformed/modules/InlineEdit/redux/InlineEditActions";
import InlineEdit from "beinformed/modules/InlineEdit/InlineEdit";

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps) => ({
  ...ownProps
});

export default connect(mapStateToProps, {
  onAttributeChange: updateEditableListAttribute,
  onCancel: cancelEditableListItem,
  onDelete: startAction,
  onItemClick: gotoListItem,
  onSave: saveEditableListItem,
  onStartProgress: startProgress,
  onFinishProgress: finishProgress
})(InlineEdit);
