// @flow
import { connect } from "react-redux";

import {
  startProgress,
  finishProgress
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";
import { gotoConceptDetail } from "beinformed/modules/ConceptDetail/redux/ConceptDetailActions";
import ModelOverview from "beinformed/modules/ModelOverview/ModelOverview";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  defaultOverview: "tom",
  conceptIndex: state.conceptindex
});

export default connect(mapStateToProps, {
  onConceptClick: gotoConceptDetail,
  onStart: startProgress,
  onFinish: finishProgress
})(ModelOverview);
