// @flow
import Authentication from "beinformed/modularui/Authentication";

export type LoginState = Authentication;

// REDUCER
const initialState = new Authentication();

const updateLoginAttribute = (state, type, value) => {
  const newState = state.clone();
  if (type === "username") {
    newState.updateUsername(value);
  } else if (type === "password") {
    newState.updatePassword(value);
  }
  return newState;
};

/**
 * Login reducer
 */
export default function loginReducer(
  state: LoginState = initialState,
  action: Action
) {
  switch (action.type) {
    case "UPDATE_LOGIN_USERNAME_ATTRIBUTE":
      return updateLoginAttribute(state, "username", action.payload);

    case "UPDATE_LOGIN_PASSWORD_ATTRIBUTE":
      return updateLoginAttribute(state, "password", action.payload);

    case "CANCEL_LOGIN":
      return new Authentication();

    case "START_LOGIN":
    case "LOGIN_SUCCESS":
    case "LOGIN_FAILED":
      return action.payload;

    default:
      return state;
  }
}
