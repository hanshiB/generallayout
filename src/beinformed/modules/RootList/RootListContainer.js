// @flow
import { connect } from "react-redux";

import {
  changeFilterItem,
  resetFilter,
  submitFilter
} from "beinformed/modules/Filter/redux/FilterActions";
import {
  gotoListItem,
  gotoListContextItem,
  updateSorting,
  updatePaging,
  updatePageSize
} from "beinformed/modules/List/redux/ListActions";
import { gotoCaseView } from "beinformed/modules/CaseView/redux/CaseViewActions";
import List from "beinformed/modules/List/List";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  keepPanelsInView: true,
  list: state.tabcomponent
});

export default connect(mapStateToProps, {
  onItemClick: gotoListItem,
  onOpenCase: gotoCaseView,
  onFilterChange: changeFilterItem,
  onFilterReset: resetFilter,
  onFilterSubmit: submitFilter,
  onContextItemClick: gotoListContextItem,
  onSortChange: updateSorting,
  onPageChange: updatePaging,
  onPageSizeChange: updatePageSize
})(List);
