// @flow
import { connect } from "react-redux";

import { dismissNotification } from "beinformed/modules/Notification/redux/NotificationActions";
import Notification from "beinformed/modules/Notification/Notification";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  messageId: state.notification.messageId,
  messageType: state.notification.messageType,
  messageData: state.notification.messageData,
  error: state.notification.error,
  render: state.notification.render
});

export default connect(mapStateToProps, {
  onDismiss: dismissNotification
})(Notification);
