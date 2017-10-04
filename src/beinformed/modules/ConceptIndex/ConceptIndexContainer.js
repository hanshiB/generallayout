// @flow
import { connect } from "react-redux";

import { gotoConceptCharacter } from "beinformed/modules/ConceptIndex/redux/ConceptIndexActions";
import { gotoConceptDetail } from "beinformed/modules/ConceptDetail/redux/ConceptDetailActions";
import ConceptIndex from "beinformed/modules/ConceptIndex/ConceptIndex";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  conceptIndex: state.conceptindex
});

export default connect(mapStateToProps, {
  onConceptClick: gotoConceptDetail,
  onCharClick: gotoConceptCharacter
})(ConceptIndex);
