// @flow
import { connect } from "react-redux";

import Href from "beinformed/models/href/Href";
import { gotoModelCatalog } from "beinformed/modules/ModelCatalog/redux/ModelCatalogActions";
import ModelCatalogHeaderLink from "beinformed/modules/ModelCatalog/ModelCatalogHeaderLink";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  link: state.application.modelcatalog,
  isActive:
    state.router.url.startsWith(new Href("/modelcatalog")) ||
    state.router.url.startsWith(new Href("/concepts"))
});

export default connect(mapStateToProps, {
  onClick: gotoModelCatalog
})(ModelCatalogHeaderLink);
