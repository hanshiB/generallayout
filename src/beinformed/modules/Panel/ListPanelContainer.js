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
import ListPanel from "beinformed/modules/Panel/ListPanel";

import type ListModel from "beinformed/models/list/ListModel";

type ownPropsType = {
  list: ListModel,
  isTab?: boolean,
  isActive?: boolean
};

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps: ownPropsType) => ({
  list: ownProps.list,
  isTab: ownProps.isTab || false,
  isActive: ownProps.isActive || false
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
})(ListPanel);
