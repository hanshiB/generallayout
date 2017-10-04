// @flow
import { connect } from "react-redux";

import AccountMenu from "beinformed/modules/AccountMenu/AccountMenu";
import {
  handleLogin,
  handleLogout
} from "beinformed/modules/Login/redux/LoginActions";
import {
  openUserProfile,
  closeUserProfile
} from "beinformed/modules/UserProfile/redux/UserProfileActions";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  user: state.application.user,
  userServices: state.application.userServices,
  userProfile: state.userprofile
});

export default connect(mapStateToProps, {
  onLoginClick: handleLogin,
  onLogoutClick: handleLogout,
  onUserProfileClick: openUserProfile,
  onUserProfileHide: closeUserProfile
})(AccountMenu);
