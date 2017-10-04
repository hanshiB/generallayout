// @flow
import Href from "beinformed/models/href/Href";

export type RouterState = {
  url: Href
};

// REDUCER
const initialState = {
  url: typeof location === "undefined" ? new Href("/") : new Href(location.href)
};

/**
 * Form reducer
 */
export default function tabReducer(
  state: RouterState = initialState,
  action: Action
) {
  switch (action.type) {
    case "LOCATION_CHANGE":
      return {
        ...state,
        url: action.payload
      };

    default:
      return state;
  }
}
