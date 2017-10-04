// @flow
import { connect } from "react-redux";

import { openPanel } from "beinformed/modules/Panel/redux/PanelActions";
import CaseView from "beinformed/modules/CaseView/CaseView";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  caseview: state.caseview
});

export default connect(mapStateToProps, {
  onPanelTabClick: openPanel
})(CaseView);
