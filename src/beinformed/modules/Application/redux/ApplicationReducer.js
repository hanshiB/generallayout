// @flow
import ApplicationModel from "beinformed/models/application/ApplicationModel";

export type ApplicationState = ApplicationModel;

// REDUCER
const initialState = new ApplicationModel();

export default function applicationReducer(
  state: ApplicationState = initialState,
  action: Action
) {
  switch (action.type) {
    case "RECEIVE_APPLICATION":
      return action.payload;
    default:
      return state;
  }
}
