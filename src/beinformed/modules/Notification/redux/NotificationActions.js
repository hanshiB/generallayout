// @flow
import {
  startProgress,
  finishProgress
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";
import {
  HIDE_NOTIFICATION_TIMEOUT,
  NOTIFICATION_MSG_MAP,
  SUCCESS,
  ERROR
} from "beinformed/constants/Constants";
import { NOTIFY } from "beinformed/constants/LayoutHints";
import type FormModel from "beinformed/models/form/FormModel";
import type ErrorResponse from "beinformed/models/error/ErrorResponse";

export type dismissNotificationType = {
  type: "DISMISS_NOTIFICATION"
};
export type showNotificationActionType = {
  type: "SHOW_NOTIFICATION",
  payload: {
    type: string,
    id: string | null,
    parameters?: Object | null,
    error?: ErrorResponse
  }
};

/**
 * Dismiss notification message
 */
export const dismissNotification = (): dismissNotificationType => ({
  type: "DISMISS_NOTIFICATION"
});

// eslint-disable-next-line max-params
export const showNotification = (
  type: string,
  id: string | null,
  parameters?: Object | null,
  error?: ErrorResponse
): showNotificationActionType => ({
  type: "SHOW_NOTIFICATION",
  payload: {
    type,
    id,
    parameters,
    error
  }
});

/**
 * Show form notification
 */
export const showFormNotification = (
  form: FormModel
): ThunkAction => dispatch => {
  dispatch(startProgress());

  if (form.layouthint.has(NOTIFY)) {
    dispatch(
      showNotification(SUCCESS, NOTIFICATION_MSG_MAP[form.actiontype], null)
    );
  }

  setTimeout(() => {
    dispatch(dismissNotification());
  }, HIDE_NOTIFICATION_TIMEOUT);

  return dispatch(finishProgress());
};

/**
 * Show error notification
 */
export const showXHRErrorNotification = (
  error: ErrorResponse
): ThunkAction => dispatch =>
  dispatch(showNotification(ERROR, error.id, error.parameters, error));
