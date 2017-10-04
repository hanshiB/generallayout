// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";

import { gotoComponent } from "beinformed/modules/TabComponent/redux/TabComponentActions";

import TabModel from "beinformed/models/tab/TabModel";

import type Href from "beinformed/models/href/Href";

export type receiveTabType = {
  type: "RECEIVE_TAB",
  payload: TabModel
};

// ACTIONS
/**
 * Send receive tab action
 */
export const receiveTab = (tabModel: TabModel): receiveTabType => ({
  type: "RECEIVE_TAB",
  payload: tabModel
});

/**
 * Goto tab
 */
export const gotoTabAction = (href: Href) => ({
  [MODULARUI]: {
    href,
    targetModel: TabModel,
    successAction: receiveTab,
    nextAction: tab =>
      tab.hasComponents() ? gotoComponent(tab.components.first.href) : null
  }
});

export const gotoTab = (href: Href): ThunkAction => dispatch =>
  dispatch(gotoTabAction(href));
