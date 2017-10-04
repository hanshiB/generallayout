// @flow
import { connect } from "react-redux";

import {
  quicksearch,
  search
} from "beinformed/modules/CaseSearch/redux/CaseSearchActions";
import { gotoCaseView } from "beinformed/modules/CaseView/redux/CaseViewActions";
import QuickSearch from "beinformed/modules/CaseSearch/QuickSearch";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  search: state.tab.search
});

export default connect(mapStateToProps, {
  onSearch: search,
  onQuickSearch: quicksearch,
  onItemClick: gotoCaseView
})(QuickSearch);
