// @flow
import { connect } from "react-redux";

import { gotoConceptDetail } from "beinformed/modules/ConceptDetail/redux/ConceptDetailActions";
import { gotoContentDetail } from "beinformed/modules/ContentDetail/redux/ContentDetailActions";
import ConceptDetail from "beinformed/modules/ConceptDetail/ConceptDetail";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  conceptDetail: state.conceptdetail
});

export default connect(mapStateToProps, {
  onConceptClick: gotoConceptDetail,
  onContentClick: gotoContentDetail
})(ConceptDetail);
