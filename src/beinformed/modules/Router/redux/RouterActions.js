// @flow
import Href from "beinformed/models/href/Href";
import { loadClientState } from "beinformed/modularui/loadState";

export type locationChangeType = {
  type: "LOCATION_CHANGE",
  payload: Href
};

export type hydrateStateType = {
  type: "HYDRATE_STATE",
  state: Object
};

// ACTIONS
/**
 * Save browser location changes into store
 */
const locationChange = (
  location: Href = new Href("/")
): locationChangeType => ({
  type: "LOCATION_CHANGE",
  payload: location
});

const hydrateState = (newState: Object): hydrateStateType => ({
  type: "HYDRATE_STATE",
  state: newState
});

/**
 * Handle pop state event of browser
 */
const popState = (location: Href = new Href("/")): ThunkAction => (
  dispatch,
  getState
) =>
  loadClientState(location)
    .then(loadedState => {
      const newState = loadedState;

      if (newState.router) {
        newState.router = getState().router;
      }

      return dispatch(hydrateState);
    })
    .catch(console.log.bind(console)); // eslint-disable-line no-console

export { locationChange, popState };
