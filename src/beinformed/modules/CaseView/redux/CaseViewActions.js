// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";

import CaseViewModel from "beinformed/models/caseview/CaseViewModel";

import type Href from "beinformed/models/href/Href";

export type receiveCaseViewType = {
  type: "RECEIVE_CASEVIEW",
  payload: CaseViewModel
};

/**
 * Receive the caseview
 */
export const receiveCaseView = (
  caseview: CaseViewModel
): receiveCaseViewType => ({
  type: "RECEIVE_CASEVIEW",
  payload: caseview
});

/**
 * Goto the caseview
 */
export const fetchCaseView = (href: Href) => ({
  [MODULARUI]: {
    href,
    targetModel: CaseViewModel,
    successAction: receiveCaseView,
    updateBrowserLocation: href
  }
});

export const gotoCaseView = (href: Href): ThunkAction => dispatch =>
  dispatch(fetchCaseView(href));

/**
 * Update current caseview
 */
export const updateCaseView = (): ThunkAction => (dispatch, getState) => {
  const currentCaseView = getState().caseview;

  if (currentCaseView) {
    const caseviewHref = currentCaseView.selflink.href;

    return {
      [MODULARUI]: {
        href: caseviewHref,
        childmodels: false,
        targetModel: CaseViewModel,
        successAction: caseview => {
          const newCaseView = currentCaseView.update(caseview);
          return receiveCaseView(newCaseView);
        },
        updateBrowserLocation: caseviewHref
      }
    };
  }

  return null;
};
