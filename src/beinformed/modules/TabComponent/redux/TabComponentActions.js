// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";

import type Href from "beinformed/models/href/Href";

import CaseViewModel from "beinformed/models/caseview/CaseViewModel";
import ListModel from "beinformed/models/list/ListModel";

export type receiveComponentType = {
  type: "RECEIVE_COMPONENT",
  payload: CaseViewModel | ListModel
};

// ACTIONS
/**
 * Send received component
 */
export const receiveComponent = (
  componentModel: CaseViewModel | ListModel
): receiveComponentType => ({
  type: "RECEIVE_COMPONENT",
  payload: componentModel
});

const gotoComponentAction = (href: Href) => ({
  [MODULARUI]: {
    href,
    successAction: receiveComponent,
    updateBrowserLocation: href
  }
});

/**
 * Go to component
 */
export const gotoComponent = (href: Href): ThunkAction => dispatch =>
  dispatch(gotoComponentAction(href));
