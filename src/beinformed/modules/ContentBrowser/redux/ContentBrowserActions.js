// @flow
import Href from "beinformed/models/href/Href";
import { locationChange } from "beinformed/modules/Router/redux/RouterActions";
import {
  startProgress,
  finishProgress
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";
import { requestContentIndex } from "beinformed/modules/ContentIndex/redux/ContentIndexActions";

// ACTIONS
/**
 * Goto source browser
 */
export const gotoContentBrowser = (href: Href): ThunkAction => dispatch => {
  dispatch(startProgress());

  dispatch(locationChange(href));

  dispatch(requestContentIndex(new Href("/content")));

  return dispatch(finishProgress());
};
