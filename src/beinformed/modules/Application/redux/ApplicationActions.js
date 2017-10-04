// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";

import Href from "beinformed/models/href/Href";
import { gotoTab } from "beinformed/modules/Tab/redux/TabActions";
import ApplicationModel from "beinformed/models/application/ApplicationModel";

import type LinkModel from "beinformed/models/links/LinkModel";

export type receiveApplicationType = {
  type: "RECEIVE_APPLICATION",
  payload: ApplicationModel
};

// ACTIONS

/**
 * Send receive action for the application
 */
export const receiveApplication = (
  application: ApplicationModel
): receiveApplicationType => ({
  type: "RECEIVE_APPLICATION",
  payload: application
});

/**
* Open first component of application
*/
export const gotoRootComponent = (link: LinkModel): ThunkAction => dispatch =>
  dispatch(gotoTab(link.href));

/**
 * Reload root uri
 */
export const reloadApplication = () => ({
  [MODULARUI]: {
    href: new Href("/"),
    targetModel: ApplicationModel,
    successAction: receiveApplication,
    nextAction: application => gotoRootComponent(application.tabs.first)
  }
});
