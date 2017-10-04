// @flow
import type TabModel from "beinformed/models/tab/TabModel";

export type TabState = TabModel | null;

// REDUCER
const initialState = null;

/**
 * Tab reducer
 */
export default function tabReducer(
  state: TabState = initialState,
  action: Action
) {
  switch (action.type) {
    case "RECEIVE_QUICKSEARCH": {
      if (state === null) {
        return state;
      }

      const tabModel = state.clone();
      tabModel.search = action.payload;
      return tabModel;
    }

    case "RECEIVE_TAB":
      return action.payload;

    default:
      return state;
  }
}
