// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";

import CaseSearchModel from "beinformed/models/search/CaseSearchModel";
import { gotoComponent } from "beinformed/modules/TabComponent/redux/TabComponentActions";

import type FilterModel from "beinformed/models/filters/FilterModel";

export type receiveQuickSearchType = {
  type: "RECEIVE_QUICKSEARCH",
  payload: CaseSearchModel
};

/**
 * Receive quick search
 */
export const receiveQuickSearch = (
  result: CaseSearchModel
): receiveQuickSearchType => ({
  type: "RECEIVE_QUICKSEARCH",
  payload: result
});

/**
 * Create href for search
 */
const createSearchHref = (searchModel, filter, value) => {
  const newSearch = searchModel.clone();

  newSearch.filterCollection.reset();
  newSearch.filterCollection.update(filter.attribute, value);
  if (!newSearch.filterCollection.isValid) {
    return false;
  }

  const searchHref = newSearch.selfhref;

  searchHref.page = 1;
  searchHref.filterCollection = newSearch.filterCollection;

  return searchHref;
};

/**
 * Do search
 */
export const search = (
  searchModel: CaseSearchModel,
  filter: FilterModel,
  value: string
): ThunkAction => dispatch => {
  const searchHref = createSearchHref(searchModel, filter, value);

  return searchHref ? dispatch(gotoComponent(searchHref)) : false;
};

/**
 * Do quick search
 */
export const quicksearch = (
  searchModel: CaseSearchModel,
  filter: FilterModel,
  value: string
): ThunkAction => dispatch => {
  const searchHref = createSearchHref(searchModel, filter, value);

  if (searchHref) {
    return dispatch({
      [MODULARUI]: {
        href: searchHref,
        targetModel: CaseSearchModel,
        successAction: receiveQuickSearch
      }
    });
  }

  return false;
};
