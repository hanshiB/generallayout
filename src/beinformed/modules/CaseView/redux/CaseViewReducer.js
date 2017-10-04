// @flow
import PanelCollection from "beinformed/models/panels/PanelCollection";
import GroupingPanelModel from "beinformed/models/panels/GroupingPanelModel";
import ListModel from "beinformed/models/list/ListModel";
import type CaseViewModel from "beinformed/models/caseview/CaseViewModel";

export type CaseViewState = CaseViewModel | null;

// ACTION HANDLERS
/**
 * Handles a new panel and replaces a current panel with this panel.
 * Panel navigation occurs when a caseview or grouping panel are rendered in tab view
 */
const receivePanel = (state, action) => {
  if (!state) {
    return state;
  }

  const newCaseView = state.clone();

  // check for panel on root level -> case view panels
  if (state.links.hasLink(action.payload.selflink)) {
    if (state.renderPanelsAsTab()) {
      newCaseView.panelCollection = new PanelCollection([action.payload]);
    } else {
      newCaseView.panelCollection.update(action.payload);
    }
    newCaseView.panelCollection.activeHref = action.payload.selfhref;

    return newCaseView;
  }

  // check for panel on lower level -> grouping panel panels
  const groupPanel = state.panelCollection.all.find(panel =>
    panel.links.hasLink(action.payload.selflink)
  );
  if (groupPanel) {
    const newGroupPanel = groupPanel.clone();

    newGroupPanel.panelCollection.collection = [action.payload];
    newCaseView.panelCollection.replace(groupPanel.selfhref, newGroupPanel);
  }

  return newCaseView;
};

/**
 * Receive new list panel
 */
const receiveList = (state, action) => {
  if (!state) {
    return state;
  }
  const list = action.payload;

  // When parent is this caseview, update an existing panel
  if (state.panelCollection.hasPanelByHref(list.selfhref, false)) {
    return state.replacePanel(list.selfhref, list);
  }

  // when panel is a child of a panel of the caseview
  if (state.panelCollection.hasPanelByHref(list.selfhref)) {
    const parent = state.panelCollection.getPanelByHref(list.selfhref);

    // when parent panel is a grouping panel
    if (parent instanceof GroupingPanelModel) {
      const panelToReplace = parent.panelCollection.getPanelByHref(
        list.selfhref
      );

      const newGroupingPanel = parent.replacePanel(
        panelToReplace.selfhref,
        list
      );
      return state.replacePanel(parent.selfhref, newGroupingPanel);
    }

    // else update panel
    list.context.parent = parent.context;

    return state.replacePanel(parent.selfhref, list);
  }

  return null;
};

/**
 * Put received context into the state
 */
const receiveContext = (state, action) => {
  if (!state) {
    return state;
  }

  // receiving context list, set context to remaining context of the new list
  const oldList = state.panelCollection.all.find(
    panel =>
      panel instanceof ListModel &&
      panel.context.hasContextOfHref(action.payload.selfhref)
  );

  // it should not be possible that no list is available when context is available
  if (!oldList || !(oldList instanceof ListModel)) {
    return state;
  }

  const newList = action.payload.moveContext(oldList.context);
  return state.replacePanel(oldList.selfhref, newList);
};

/**
 * Put tab into the state
 */
const openTab = (state, action) => {
  if (!state) {
    return state;
  }

  const newGroupingPanel = action.payload.panel.clone();

  newGroupingPanel.panelCollection.activeHref = action.payload.href;

  return state.replacePanel(newGroupingPanel.selfhref, newGroupingPanel);
};

// REDUCER
const initialState = null;

/**
 * Form reducer
 */
export default function caseviewReducer(
  state: CaseViewState = initialState,
  action: Action
) {
  switch (action.type) {
    case "RECEIVE_LIST_CONTEXT":
      return receiveContext(state, action);
    case "RECEIVE_LIST":
      return receiveList(state, action);
    case "RECEIVE_PANEL":
      return receivePanel(state, action);
    case "RECEIVE_COMPONENT":
      return null;
    case "RECEIVE_CASEVIEW":
      return action.payload;
    case "OPEN_TAB":
      return openTab(state, action);
    default:
      return state;
  }
}
