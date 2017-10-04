// @flow
import { connect } from "react-redux";

import { injectMessage } from "beinformed/modules/I18n/Message";
import { handleSearch } from "beinformed/modules/ModelCatalog/redux/ModelCatalogActions";
import { gotoConceptDetail } from "beinformed/modules/ConceptDetail/redux/ConceptDetailActions";
import ModelCatalogSearch from "beinformed/modules/ModelCatalog/ModelCatalogSearch";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  search: state.modelcatalog.search
});

export default connect(mapStateToProps, {
  onChange: handleSearch,
  onConceptClick: gotoConceptDetail
})(injectMessage(ModelCatalogSearch));
