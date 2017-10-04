// @flow
import { connect } from "react-redux";

import { gotoContentCharacter } from "beinformed/modules/ContentIndex/redux/ContentIndexActions";
import { gotoContentDetail } from "beinformed/modules/ContentDetail/redux/ContentDetailActions";
import ContentIndex from "beinformed/modules/ContentIndex/ContentIndex";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  contentTOC: state.contentdetail.contentTOC,
  contentDetail: state.contentdetail.contentDetail,
  contentIndex: state.contentindex
});

export default connect(mapStateToProps, {
  onCharClick: gotoContentCharacter,
  onContentClick: gotoContentDetail
})(ContentIndex);
