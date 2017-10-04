// @flow
import Href from "beinformed/models/href/Href";
import routeprovider from "beinformed/modularui/routeprovider";

import ModularUI from "beinformed/modularui/ModularUI";

import { reducers } from "beinformed/redux/reducers";

/**
 * Map the resourcetype of a service response to a store key in the redux reducers
 *
 * Most of the resourcetypes can be mapped to a reducer key.
 * But when a message like below occurs:
 *
 * '[NashornEngine]  Unexpected key "key" found in preloadedState argument passed to createStore..'
 *
 * a model exists that can not be mapped to a reducer key.
 * In that case the resource type needs to be mapped on the correct reducer key
 */
const mapResourcetypeToReducerkey = type => {
  const stateKeyToResourceTypeMap = {
    tabcomponent: ["caselist"],
    tab: ["casetab"]
  };

  const key = Object.keys(stateKeyToResourceTypeMap).find(k =>
    stateKeyToResourceTypeMap[k].includes(type.toLowerCase())
  );

  return key || type.toLowerCase();
};

/**
 * PreloadState loads the state based on a given request. This always happens server side, so no promises returned.
 */
const loadServerState = (requestHref: Href, locale: string) => {
  if (!(requestHref instanceof Href)) {
    throw new TypeError(`${requestHref} should be instance of Href`);
  }
  const state = {};

  const routes = routeprovider(requestHref);
  if (Array.isArray(routes)) {
    routes.forEach(route => {
      const request = new ModularUI(route);
      request.locale = locale;

      const model = request.fetchServer();

      if (model) {
        const reducerKey = mapResourcetypeToReducerkey(model.resourcetype);

        if (reducerKey in reducers) {
          state[reducerKey] = model;
        }
      }
    });
  }

  return state;
};

/**
 * Used on popstate to retrieve complete state client side
 */
const loadClientState = (requestHref: Href) => {
  if (!(requestHref instanceof Href)) {
    throw new TypeError(`${requestHref} should be instance of Href`);
  }

  const routesResponse = routeprovider(requestHref);

  if (routesResponse instanceof Promise) {
    return routesResponse
      .then(routes => {
        const models = routes.map(route => new ModularUI(route).fetch());

        return Promise.all(models);
      })
      .then(models => {
        const state = {};

        models.forEach(model => {
          const reducerKey = mapResourcetypeToReducerkey(model.resourcetype);

          if (reducerKey in reducers) {
            state[reducerKey] = model;
          }
        });

        return state;
      });
  }

  throw new Error("routeprovider did not return a Promise");
};

export { loadServerState, loadClientState };
