// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";
import UserModel from "beinformed/models/user/UserModel";

import type Href from "beinformed/models/href/Href";

// CONSTANTS
export type receiveProfileType = {
  type: "SHOW_USERPROFILE",
  payload: UserModel
};
export type closeUserProfileType = {
  type: "CLOSE_USERPROFILE"
};

/**
 * Receive use profile
 */
export const receiveProfile = (profile: UserModel): receiveProfileType => ({
  type: "SHOW_USERPROFILE",
  payload: profile
});

/**
 * Close user profile modal
 */
export const closeUserProfile = (): closeUserProfileType => ({
  type: "CLOSE_USERPROFILE"
});

/**
 * Retrieve user profile
 */
export const openUserProfileAction = (href: Href) => ({
  [MODULARUI]: {
    href,
    targetModel: UserModel,
    successAction: receiveProfile
  }
});

export const openUserProfile = (href: Href): ThunkAction => dispatch =>
  dispatch(openUserProfileAction(href));
