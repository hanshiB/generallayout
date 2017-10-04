// @flow

import { reload } from "beinformed/modules/Redirect/redux/RedirectActions";
import {
  startProgress,
  finishProgress
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";

export type receiveLocaleType = {
  type: "UPDATE_LOCALE",
  payload: string
};

/**
 * Update current locale
 */
export const receiveLocale = (locale: string): receiveLocaleType => ({
  type: "UPDATE_LOCALE",
  payload: locale
});

/**
 * Change locale of application and redirect
 */
export const updateLocale = (locale: string): ThunkAction => dispatch => {
  dispatch(startProgress());
  dispatch(receiveLocale(locale));

  dispatch(reload());

  dispatch(finishProgress());
};
