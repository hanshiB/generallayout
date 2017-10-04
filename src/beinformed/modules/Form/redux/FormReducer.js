// @flow

import type FormModel from "beinformed/models/form/FormModel";

export type FormState = FormModel | null;

// REDUCER
const initialState = null;

/**
 * Form reducer
 */
export default function formReducer(
  state: FormState = initialState,
  action: Action
) {
  switch (action.type) {
    case "UPDATE_FORM_ATTRIBUTE":
    case "RECEIVE_FORM":
    case "RECEIVE_PREVIOUS_FORM":
      return action.payload;

    case "LOCATION_CHANGE":
    case "FORM_FINISHED":
    case "CANCEL_FORM":
      return null;

    case "RECEIVE_TAB":
    case "RECEIVE_COMPONENT":
    case "RECEIVE_CASEVIEW":
      return null;

    default:
      return state;
  }
}
