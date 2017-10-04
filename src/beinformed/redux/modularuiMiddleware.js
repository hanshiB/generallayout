/* eslint-disable promise/no-nesting, promise/no-callback-in-promise */
import ModularUIRequest from "beinformed/modularui/ModularUI";

import {
  startProgress,
  finishProgress,
  updateProgress
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";

import { handleError } from "beinformed/modules/Error/redux/ErrorActions";

import { locationChange } from "beinformed/modules/Router/redux/RouterActions";

/**
 * Symbol key that carries API call info interpreted by this Redux middleware.
 */
const MODULARUI = Symbol("Fetch ModularUI");
export { MODULARUI };

const isModularUIAction = action => action && action.hasOwnProperty(MODULARUI);

const modularuiMiddleware = store => next => action => {
  if (!isModularUIAction(action)) {
    return next(action);
  }

  const dispatch = store.dispatch;
  const modularui = action[MODULARUI];

  dispatch(startProgress());

  const modularuiRequest = new ModularUIRequest(modularui.href, {
    method: modularui.method || "get",
    data: modularui.data || {}
  });

  modularuiRequest.locale = store.getState().i18n.locale;
  modularuiRequest.targetModel = modularui.targetModel;
  modularuiRequest.listitem = modularui.listitem;
  modularuiRequest.onProgress = progressEvent => {
    if (progressEvent.lengthComputable) {
      const TOTAL_PERCENTAGE = 100;
      const percentComplete =
        progressEvent.loaded / progressEvent.total * TOTAL_PERCENTAGE;
      dispatch(updateProgress(percentComplete));
    }
  };

  const updateBrowserLocation = modularui.updateBrowserLocation;
  const successAction = modularui.successAction;
  const nextAction = modularui.nextAction;

  return modularuiRequest
    .fetch()
    .then(model => {
      if (updateBrowserLocation) {
        dispatch(locationChange(updateBrowserLocation));
      }

      if (successAction) {
        const successResult = successAction(model);

        if (successResult instanceof Promise) {
          successResult
            .then(result => dispatch(result))
            .catch(err => next(handleError(err)));
        } else {
          dispatch(successResult);
        }
      }

      if (nextAction) {
        const nextResult = nextAction(model, dispatch);

        if (nextResult !== null) {
          if (nextResult instanceof Promise) {
            nextResult
              .then(result => dispatch(result))
              .catch(err => next(handleError(err)));
          } else {
            dispatch(nextResult);
          }
        }
      }

      return next(finishProgress());
    })
    .catch(err => next(handleError(err)));
};

export default modularuiMiddleware;
