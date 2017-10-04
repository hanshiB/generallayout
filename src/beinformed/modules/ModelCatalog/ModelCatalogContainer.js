// @flow
import { connect } from "react-redux";

import ModelCatalog from "beinformed/modules/ModelCatalog/ModelCatalog";

import type { Connector } from "react-redux";
import type { ModelCatalogProps } from "beinformed/modules/ModelCatalog/ModelCatalog";
/**
 * Map state to props
 */
const mapStateToProps = (state: State) => ({
  conceptDetail: state.conceptdetail,
  conceptIndex: state.conceptindex
});

const connector: Connector<{}, ModelCatalogProps> = connect(
  mapStateToProps,
  {}
);

export default connector(ModelCatalog);
