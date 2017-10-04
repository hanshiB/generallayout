// @flow
import Authentication from "beinformed/modularui/Authentication";

import Href from "beinformed/models/href/Href";
import { reloadApplication } from "beinformed/modules/Application/redux/ApplicationActions";
import { handleError } from "beinformed/modules/Error/redux/ErrorActions";

import {
  startProgress,
  finishProgress
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";
import { showXHRErrorNotification } from "beinformed/modules/Notification/redux/NotificationActions";

export type UpdateUsernameType = {
  type: "UPDATE_LOGIN_USERNAME_ATTRIBUTE",
  payload: AttributeType
};
export type UpdatePasswordType = {
  type: "UPDATE_LOGIN_PASSWORD_ATTRIBUTE",
  payload: AttributeType
};
export type startLoginType = {
  type: "START_LOGIN",
  payload: Authentication
};

export type cancelLoginType = {
  type: "CANCEL_LOGIN"
};
export type loginFailedType = {
  type: "LOGIN_FAILED",
  payload: Authentication
};
export type loginSuccessType = {
  type: "LOGIN_SUCCESS",
  payload: Authentication
};
export type logoutSuccessType = {
  type: "LOGOUT_SUCCESS",
  payload: Authentication
};

// ACTIONS
/**
 * Send login failed action
 */
export const loginFailed = (
  authentication: Authentication
): loginFailedType => ({
  type: "LOGIN_FAILED",
  payload: authentication
});

/**
 * Send login success action
 */
export const loginSuccess = (
  authentication: Authentication
): loginSuccessType => ({
  type: "LOGIN_SUCCESS",
  payload: authentication
});

export const logoutSuccess = (
  authentication: Authentication
): logoutSuccessType => ({
  type: "LOGOUT_SUCCESS",
  payload: authentication
});

/**
 * Start a login attempt
 */
export const startLogin = (
  isBasicAuthentication: boolean,
  redirectHref: Href
): startLoginType => {
  const authentication = new Authentication();
  authentication.redirectHref = redirectHref;
  authentication.isBasicAuthentication = isBasicAuthentication;
  authentication.inProgress = true;

  return {
    type: "START_LOGIN",
    payload: authentication
  };
};

/**
 * Submit login attempt
 */
export const submitLogin = (): ThunkAction => (dispatch, getState) => {
  dispatch(startProgress());

  const authentication = getState().login;

  return authentication.login().then(
    newAuthentication => {
      if (newAuthentication.error === null) {
        dispatch(reloadApplication());
        dispatch(loginSuccess(newAuthentication));
      } else {
        dispatch(loginFailed(newAuthentication));
      }

      return dispatch(finishProgress());
    },
    err => dispatch(showXHRErrorNotification(err))
  );
};

/**
 * Cancel login attempt
 */
export const cancelLogin = (): cancelLoginType => ({
  type: "CANCEL_LOGIN"
});

/**
 * Update login attribute
 */
export const updateUsername = (value: string): UpdateUsernameType => ({
  type: "UPDATE_LOGIN_USERNAME_ATTRIBUTE",
  payload: value
});

export const updatePassword = (value: string): UpdatePasswordType => ({
  type: "UPDATE_LOGIN_PASSWORD_ATTRIBUTE",
  payload: value
});

/**
 * Do login
 */
export const handleLogin = (): ThunkAction => dispatch => {
  dispatch(startProgress());

  Authentication.startLogin()
    .then(authModel => {
      dispatch({
        type: "START_LOGIN",
        payload: authModel
      });

      return dispatch(finishProgress());
    })
    .catch(err => dispatch(handleError(err)));
};

/**
 * Do logout
 */
export const handleLogout = (): ThunkAction => (dispatch, getState) => {
  dispatch(startProgress());

  const authentication = getState().login;

  return authentication.logout().then(newAuthentication => {
    dispatch(reloadApplication());

    dispatch(logoutSuccess(newAuthentication));

    return dispatch(finishProgress());
  });
};
