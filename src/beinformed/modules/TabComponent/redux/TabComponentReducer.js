// @flow
import ListModel from "beinformed/models/list/ListModel";
import type CaseViewModel from "beinformed/models/caseview/CaseViewModel";

type TabComponentState = CaseViewModel | ListModel | null;

/**
 * Receive a list
 */
const receiveList = (state, list) => {
  // Update of current list
  if (state && state.key === list.key) {
    return list;
  }

  if (
    state instanceof ListModel &&
    state.detail &&
    state.detail.panelCollection.hasPanelByHref(list.selfhref)
  ) {
    const newList = list;

    newList.context.parent = state.context;

    return newList;
  }

  return state;
};

/**
 * Receive a new list which is context of the current list
 */
const receiveContext = (state, list) => {
  if (
    state instanceof ListModel &&
    state.context.hasContextOfHref(list.selfhref)
  ) {
    return list.moveContext(state.context);
  }

  return state;
};

// REDUCER
const initialState = null;

/**
 * Form reducer
 */
export default function tabcomponentReducer(
  state: TabComponentState = initialState,
  action: Action
) {
  switch (action.type) {
    case "RECEIVE_CASEVIEW":
      return null;

    case "RECEIVE_LIST":
      return receiveList(state, action.payload);

    case "RECEIVE_LIST_CONTEXT":
      return receiveContext(state, action.payload);

    case "RECEIVE_COMPONENT":
      return action.payload;

    default:
      return state;
  }
}
