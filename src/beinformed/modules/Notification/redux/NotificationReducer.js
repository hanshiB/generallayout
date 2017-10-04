// @flow

import type ErrorResponse from "beinformed/models/error/ErrorResponse";

export type NotificationState = {
  render: boolean,
  messageType: string | null,
  messageId: string | null,
  messageData: Object | null,
  error?: ErrorResponse | null
};

// REDUCER
const initialState = {
  render: false,
  messageType: null,
  messageId: null,
  messageData: null,
  error: null
};

/**
 * Form reducer
 */
export default function formReducer(
  state: NotificationState = initialState,
  action: Action
) {
  switch (action.type) {
    case "DISMISS_NOTIFICATION":
      return {
        ...state,
        render: false
      };

    case "SHOW_NOTIFICATION":
      return {
        ...state,
        render: true,
        messageType: action.payload.type,
        messageId: action.payload.id,
        messageData: action.payload.parameters,
        error: action.payload.error
      };

    default:
      return state;
  }
}
