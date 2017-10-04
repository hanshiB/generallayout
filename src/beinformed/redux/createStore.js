// @flow
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import serialize from "serialize-javascript";

import modularuiMiddleware from "beinformed/redux/modularuiMiddleware";

import { makeRootReducer } from "beinformed/redux/reducers";

import dehydrate from "beinformed/redux/dehydrate";

import type { Store } from "redux";

/**
 * Hydrate or rehydrate the store
 */
const makeHydratable = (reducer, hydrateActionType) => (state, action) => {
  switch (action.type) {
    case hydrateActionType:
      return reducer(action.state, action);

    default:
      return reducer(state, action);
  }
};

/**
 * Create client only store, depends on browser api's. Puts server state object from the server store into the client store
 */
const createClientStore = (serverData: Object = {}) => {
  const mappedState = dehydrate(serverData);

  const hydratableReducer = makeHydratable(makeRootReducer(), "HYDRATE_STATE");

  return createStore(
    hydratableReducer,
    mappedState,
    applyMiddleware(modularuiMiddleware, thunk)
  );
};

export const getHydratableState = (store: Store<State, Action>) => {
  const state = store.getState();

  const stateToExport = {};

  for (const reducerKey in state) {
    if (reducerKey !== "login") {
      stateToExport[reducerKey] = state[reducerKey];
    }
  }

  return serialize(stateToExport);
};

/**
 * Creates initial store, server side.
 */
const createServerStore = (preloadedState: Object) =>
  createStore(makeRootReducer(), preloadedState);

export { createServerStore, createClientStore };
