// @flow
import {
  requestList,
  receiveList
} from "beinformed/modules/List/redux/ListActions";
import type ListModel from "beinformed/models/list/ListModel";

/**
 * handles the submit of the filters by executing the list action submitFilters
 */
export const submitFilter = (list: ListModel) => {
  const href = list.selfhref;

  href.page = 1;
  href.filterCollection = list.filterCollection;

  return requestList(href);
};

/**
 * Handle change of a filter
 */
export const changeFilterItem = (
  list: ListModel,
  attribute: AttributeType,
  inputvalue: string
) => {
  const newList = list.clone();

  newList.filterCollection.update(attribute, inputvalue);

  if (attribute.type === "choice" || attribute.type === "lookup") {
    return submitFilter(newList);
  }

  return receiveList(newList);
};

/**
 * Handles click on reset button to reset all filters
 */
export const resetFilter = (list: ListModel) => {
  const href = list.selfhref;

  href.page = 1;

  href.filterCollection = list.filterCollection.reset();

  return requestList(href);
};
