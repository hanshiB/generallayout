// @flow
import { connect } from "react-redux";

import {
  cancelLogin,
  submitLogin,
  updateUsername,
  updatePassword
} from "beinformed/modules/Login/redux/LoginActions";
import LoginModal from "beinformed/modules/Login/LoginModal";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  login: state.login,
  inError: state.login.inError
});

export default connect(mapStateToProps, {
  onCancel: cancelLogin,
  onSubmit: submitLogin,
  onUsernameChange: updateUsername,
  onPasswordChange: updatePassword
})(LoginModal);
