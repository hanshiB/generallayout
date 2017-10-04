// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { Message } from "beinformed/modules/I18n/Message";
import Icon from "beinformed/modules/Icon/Icon";
import { SUCCESS, INFO, WARNING, ERROR } from "beinformed/constants/Constants";
import type ErrorResponse from "beinformed/models/error/ErrorResponse";

import "./Notification.scss";

type NotificationProps = {
  messageId: string,
  messageData: Object | null,
  messageType: string,
  error: ErrorResponse | null,
  render: boolean,
  onDismiss: (e: SyntheticEvent<*>) => void
};

class Notification extends Component<NotificationProps> {
  getNotificationClass() {
    return classNames("alert alert-dismissible notification", {
      "alert-success": this.props.messageType === SUCCESS,
      "alert-info": this.props.messageType === INFO,
      "alert-warning": this.props.messageType === WARNING,
      "alert-danger": this.props.messageType === ERROR
    });
  }

  /**
   * Correct notification icon
   */
  getIconName() {
    switch (this.props.messageType) {
      case SUCCESS:
        return "check";
      case ERROR:
        return "exclamation-circle";
      case WARNING:
        return "exclamation-triangle";
      default:
        return "info-circle";
    }
  }

  render() {
    const { messageId, messageData, error, render, onDismiss } = this.props;

    if (render) {
      return (
        <div className={this.getNotificationClass()} role="alert">
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={onDismiss}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <Icon name={this.getIconName()} textAfter />
          <Message
            id={messageId}
            defaultMessage={messageId}
            data={messageData}
          />
          {error &&
            error.id === "Error.GeneralError" &&
            error.exception &&
            error.exception.message && (
              <div className="ml-4 small error-detail">
                {error.exception.message}
              </div>
            )}
        </div>
      );
    }

    return null;
  }
}

export default Notification;
