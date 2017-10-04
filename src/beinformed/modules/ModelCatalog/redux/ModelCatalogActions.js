/* eslint-disable no-unused-vars */
// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";

import { DateUtil } from "beinformed/util/datetime/DateTimeUtil";
import { handleGeneralError } from "beinformed/modules/Error/redux/ErrorActions";

import { requestConceptIndex } from "beinformed/modules/ConceptIndex/redux/ConceptIndexActions";

import ModelCatalogModel from "beinformed/models/modelcatalog/ModelCatalogModel";
import ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";

import type Href from "beinformed/models/href/Href";

export type receiveModelCatalogType = {
  type: "RECEIVE_MODELCATALOG",
  payload: ModelCatalogModel
};
export type receiveEntryDateType = {
  type: "RECEIVE_ENTRYDATE",
  payload: string
};
export type receiveModelcatalogSearchResultType = {
  type: "RECEIVE_MODELCATALOG_SEARCHRESULT",
  payload: ConceptIndexModel
};

// ACTIONS
/**
 * Receive modelcatalog
 */
export const receiveModelCatalog = (
  modelcatalog: ModelCatalogModel
): receiveModelCatalogType => ({
  type: "RECEIVE_MODELCATALOG",
  payload: modelcatalog
});

export const receiveEntryDate = (entryDate: string): receiveEntryDateType => ({
  type: "RECEIVE_ENTRYDATE",
  payload: entryDate
});

export const receiveModelcatalogSearchResult = (
  searchResultModel: ConceptIndexModel
): receiveModelcatalogSearchResultType => ({
  type: "RECEIVE_MODELCATALOG_SEARCHRESULT",
  payload: searchResultModel
});

const gotoModelCatalogAction = (href: Href) => ({
  [MODULARUI]: {
    href,
    targetModel: ModelCatalogModel,
    successAction: receiveModelCatalog,
    nextAction: modelcatalog =>
      requestConceptIndex(modelcatalog.conceptIndexLink.href)
  }
});

/**
 * Goto model catalog
 */
export const gotoModelCatalog = (href: Href): ThunkAction => dispatch =>
  dispatch(gotoModelCatalogAction(href));

/**
 * Change entry date of modelcatalog / sources
 */
export const changeEntryDate = (entryDate: string): ThunkAction => (
  dispatch,
  getState
) => {
  if (DateUtil.isValid(entryDate, "YYYY-M-D")) {
    dispatch(receiveEntryDate(entryDate));

    return dispatch(gotoModelCatalog(getState().application.modelcatalog.href));
  }

  return dispatch(receiveEntryDate(entryDate));
};

const searchCatalog = href => ({
  [MODULARUI]: {
    href,
    targetModel: ConceptIndexModel,
    successAction: receiveModelcatalogSearchResult
  }
});

let timeout = null;
const SEARCH_THROTTLE_TIMEOUT = 100;

/**
 * Search the modelcatalog using the search index
 */
export const handleSearch = (searchTerm: string): ThunkAction => (
  dispatch,
  getState
) => {
  if (timeout !== null) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    const searchHref = getState().modelcatalog.catalog.conceptIndexLink.href;
    searchHref.addParameter("label", searchTerm);

    return dispatch(searchCatalog(searchHref));
  }, SEARCH_THROTTLE_TIMEOUT);
};
