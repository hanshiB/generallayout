// @flow
import ModularUI from "beinformed/modularui/ModularUI";

import routeprovider from "beinformed/modularui/routeprovider";
import ResourceModel from "beinformed/models/base/ResourceModel";
import { locationChange } from "beinformed/modules/Router/redux/RouterActions";
import {
  startProgress,
  finishProgress
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";
import { handleError } from "beinformed/modules/Error/redux/ErrorActions";
import { receiveApplication } from "beinformed/modules/Application/redux/ApplicationActions";
import { receiveCaseView } from "beinformed/modules/CaseView/redux/CaseViewActions";
import { receiveForm } from "beinformed/modules/Form/redux/FormActions";
import { receiveTab } from "beinformed/modules/Tab/redux/TabActions";
import { receiveList } from "beinformed/modules/List/redux/ListActions";
import { receivePanel } from "beinformed/modules/Panel/redux/PanelActions";
import { receiveConceptIndex } from "beinformed/modules/ConceptIndex/redux/ConceptIndexActions";
import {
  receiveConceptDetail,
  finalizeConceptInformation
} from "beinformed/modules/ConceptDetail/redux/ConceptDetailActions";
import { receiveContentIndex } from "beinformed/modules/ContentIndex/redux/ContentIndexActions";
import { receiveContentDetail } from "beinformed/modules/ContentDetail/redux/ContentDetailActions";
import type Href from "beinformed/models/href/Href";

/**
 * Get action type based on the type of model received from fetchModel
 */
const dispatchModel = (model: any): Action => {
  const modelType = model.type;

  switch (modelType) {
    case "Application":
      return receiveApplication(model);
    case "CaseView":
      return receiveCaseView(model);
    case "GroupingPanel":
      return receivePanel(model);
    case "Form":
      return receiveForm(model);
    case "Tab":
      return receiveTab(model);
    case "List":
      return receiveList(model);
    case "ConceptIndex":
      return receiveConceptIndex(model);
    case "ConceptDetail":
      return receiveConceptDetail(model);
    case "ContentIndex":
      return receiveContentIndex(model);
    case "Content":
      return receiveContentDetail(model);
    default:
      throw new Error(
        `Could not dispatch model after redirect, unknown model type for redirect to: ${modelType}`
      );
  }
};

const fetchRedirect = (href: Href, locale: string) => {
  const routesResponse = routeprovider(href);

  if (routesResponse instanceof Promise) {
    return routesResponse.then(routes => {
      const models = routes.map(route => {
        const request = new ModularUI(route);
        request.locale = locale;

        return request.fetch();
      });

      return Promise.all(models);
    });
  }

  throw new Error("Did not receive a Promise from the routeprovider");
};

// ACTIONS
/**
 * Redirect
 */
export const redirect = (href: Href): ThunkAction => (dispatch, getState) => {
  dispatch(startProgress());

  return fetchRedirect(href, getState().i18n.locale)
    .then(models => {
      dispatch(locationChange(href));

      models.forEach(model => {
        dispatch(dispatchModel(model));
      });

      return dispatch(finishProgress());
    })
    .catch(err => dispatch(handleError(err)));
};

export const reload = (): ThunkAction => (dispatch, getState) => {
  dispatch(startProgress());

  const locale = getState().i18n.locale;

  const reducerKeys = Object.keys(getState());

  const fetchModels = [];

  reducerKeys.forEach(key => {
    const reducer = getState()[key];

    if (reducer instanceof ResourceModel) {
      const request = new ModularUI(reducer.selfhref);
      request.locale = locale;

      fetchModels.push(
        request.fetch().then(model => {
          if (key === "conceptdetail") {
            return finalizeConceptInformation(
              model.selfhref,
              getState().modelcatalog.entryDate,
              model
            );
          }

          return model;
        })
      );
    }
  });

  return Promise.all(fetchModels)
    .then(models => {
      models.forEach(model => {
        dispatch(dispatchModel(model));
      });

      return dispatch(finishProgress());
    })
    .catch(err => dispatch(handleError(err)));
};
