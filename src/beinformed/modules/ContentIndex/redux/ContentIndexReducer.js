// @flow
import type ContentIndexModel from "beinformed/models/content/ContentIndexModel";

export type ContentIndexState = ContentIndexModel | null;

// REDUCER
const initialState = null;

/**
 * Form reducer
 */
export default function contentindexReducer(
  state: ContentIndexState = initialState,
  action: Action
) {
  switch (action.type) {
    case "RECEIVE_CONTENTINDEX":
      return action.payload;

    default:
      return state;
  }
}
