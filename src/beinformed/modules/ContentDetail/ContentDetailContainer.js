// @flow
import { connect } from "react-redux";

import { gotoConceptDetail } from "beinformed/modules/ConceptDetail/redux/ConceptDetailActions";
import { gotoContentDetail } from "beinformed/modules/ContentDetail/redux/ContentDetailActions";
import ContentDetail from "beinformed/modules/ContentDetail/ContentDetail";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  contentTOC: state.contentdetail.contentTOC,
  contentDetail: state.contentdetail.contentDetail
});

export default connect(mapStateToProps, {
  onConceptClick: gotoConceptDetail,
  onContentClick: gotoContentDetail
})(ContentDetail);
