// @flow
import { connect } from "react-redux";

import { changeEntryDate } from "beinformed/modules/ModelCatalog/redux/ModelCatalogActions";
import EntryDate from "beinformed/modules/ModelCatalog/EntryDate";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  entryDate: state.modelcatalog.entryDate
});

export default connect(mapStateToProps, {
  onChange: changeEntryDate
})(EntryDate);
