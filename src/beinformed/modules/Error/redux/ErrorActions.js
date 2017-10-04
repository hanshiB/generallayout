// @flow
import ErrorResponse from "beinformed/models/error/ErrorResponse";
import { resetProgress } from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";
import {
  showXHRErrorNotification,
  showNotification
} from "beinformed/modules/Notification/redux/NotificationActions";
import { startLogin } from "beinformed/modules/Login/redux/LoginActions";

import { ERROR } from "beinformed/constants/Constants";

import type XHRExceptionError from "beinformed/util/fetch/XHRExceptionError";

/**
 * Handle errors by sending an error notification message
 */
export const handleError = (
  exception: XHRExceptionError
): ThunkAction => dispatch => {
  dispatch(resetProgress());
  const error = new ErrorResponse(exception);

  if (error.isUnauthorized) {
    return dispatch(startLogin(error.isBasicAuthentication, error.responseURL));
  }

  dispatch(showXHRErrorNotification(error));

  throw exception;
};

export const handleGeneralError = (error: string): ThunkAction => dispatch =>
  dispatch(showNotification(ERROR, error));
