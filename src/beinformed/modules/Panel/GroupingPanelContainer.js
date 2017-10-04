// @flow
import { connect } from "react-redux";

import { openGroupingPanelTab } from "beinformed/modules/Panel/redux/PanelActions";
import GroupingPanel from "beinformed/modules/Panel/GroupingPanel";

/**
 * Map state to props
 */
const mapStateToProps = (state, { panel }) => ({
  isStage: state.caseview.isStagesView,
  panel
});

export default connect(mapStateToProps, {
  onPanelTabClick: openGroupingPanelTab
})(GroupingPanel);
