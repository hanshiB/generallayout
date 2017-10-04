// @flow
import Href from "beinformed/models/href/Href";
import Locales from "beinformed/i18n/Locales";

import resolveModel from "beinformed/modularui/resolveModel";

import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

/**
 * Recreate a model from dehydrated data obtained after a server render.
 */
const recreateModel = (data: any) => {
  const modelData = new ModularUIResponse();
  modelData.locale = data._locale;
  modelData.key = data._key;
  modelData.data = data._data;
  modelData.contributions = data._contributions;

  const Model = resolveModel(modelData);

  const model = new Model(modelData);

  const childModels = data._childModels.map(childModel =>
    recreateModel(childModel)
  );

  model.addChildModels(childModels);

  return model;
};

/**
 * Maps dehydrated state to models that can be used to rehydrated the application.
 */
const dehydrate = (state: any) => {
  const mappedState = {};

  Object.keys(state).forEach(stateKey => {
    if (state[stateKey] && "_data" in state[stateKey]) {
      mappedState[stateKey] = recreateModel(state[stateKey]);
    } else if (stateKey === "router") {
      mappedState.router = {
        url: new Href(state.router.url)
      };
    } else if (stateKey === "i18n") {
      Locales.dehydrate(state.i18n.locales);
      mappedState.i18n = {
        locales: Locales,
        locale: state.i18n.locale
      };
    } else if (stateKey !== "i18n") {
      mappedState[stateKey] = state[stateKey];
    }
  });

  return mappedState;
};

export default dehydrate;
