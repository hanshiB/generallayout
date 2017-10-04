// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";

import {
  startProgress,
  finishProgress
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";

import type { PanelType } from "beinformed/models/panels/PanelCollection";
import type Href from "beinformed/models/href/Href";

export type receivePanelType = {
  type: "RECEIVE_PANEL",
  payload: PanelType
};
export type openTabType = {
  type: "OPEN_TAB",
  payload: {
    panel: PanelType,
    href: Href
  }
};

// ACTIONS
/**
 * Receive a panel
 */
export const receivePanel = (panel: PanelType): receivePanelType => ({
  type: "RECEIVE_PANEL",
  payload: panel
});

/**
 * Open a panel
 */
export const openPanelAction = (href: Href) => ({
  [MODULARUI]: {
    href,
    updateBrowserLocation: href,
    successAction: receivePanel
  }
});

export const openPanel = (href: Href): ThunkAction => dispatch =>
  dispatch(openPanelAction(href));

/**
 * Open a tab
 */
export const openGroupingPanelTab = (
  panel: PanelType,
  href: Href
): ThunkAction => dispatch => {
  dispatch(startProgress());

  dispatch({
    type: "OPEN_TAB",
    payload: {
      panel,
      href
    }
  });

  return dispatch(finishProgress());
};
