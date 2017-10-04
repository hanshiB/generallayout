// @flow
import type UserModel from "beinformed/models/user/UserModel";

export type UserProfileState = UserModel | null;

// REDUCER
const initialState = null;

/**
 * Login reducer
 */
export default function userProfileReducer(
  state: UserProfileState = initialState,
  action: Action
) {
  switch (action.type) {
    case "SHOW_USERPROFILE":
      return action.payload;

    case "CLOSE_USERPROFILE":
      return null;

    default:
      return state;
  }
}
