// @flow
import { connect } from "react-redux";

import { gotoComponent } from "beinformed/modules/TabComponent/redux/TabComponentActions";
import TabComponentMenu from "beinformed/modules/TabComponent/TabComponentMenu";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  items: state.tab.components.links,
  activeLink: state.tabcomponent && state.tabcomponent.selflink
});

export default connect(mapStateToProps, {
  onItemClick: gotoComponent
})(TabComponentMenu);
