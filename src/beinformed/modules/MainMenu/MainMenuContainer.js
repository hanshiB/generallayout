// @flow
import { connect } from "react-redux";

import { gotoRootComponent } from "beinformed/modules/Application/redux/ApplicationActions";
import MainMenu from "beinformed/modules/MainMenu/MainMenu";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  className: "application-menu mr-auto",
  activeLink: state.tab ? state.tab.selflink : null,
  items: state.application.tabs
});

export default connect(mapStateToProps, {
  onClick: gotoRootComponent
})(MainMenu);
