// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";

import type ContextItemModel from "beinformed/models/context/ContextItemModel";
import Href from "beinformed/models/href/Href";

import ListModel from "beinformed/models/list/ListModel";
import ListDetailModel from "beinformed/models/list/ListDetailModel";

export type receiveListType = {
  type: "RECEIVE_LIST",
  payload: ListModel
};
export type receiveListContextType = {
  type: "RECEIVE_LIST_CONTEXT",
  payload: ListModel
};

/**
 * Receive a list
 */
export const receiveList = (list: ListModel): receiveListType => ({
  type: "RECEIVE_LIST",
  payload: list
});

/**
 * Receive a list item, send a receive list action
 */
export const receiveListWithItem = (list: ListModel): receiveListType => ({
  type: "RECEIVE_LIST",
  payload: list
});

export const receiveListContext = (
  list: ListModel
): receiveListContextType => ({
  type: "RECEIVE_LIST_CONTEXT",
  payload: list
});

/**
 * Request a list
 */
export const fetchList = (href: Href) => ({
  [MODULARUI]: {
    href,
    successAction: receiveList
  }
});

export const requestList = (href: Href): ThunkAction => dispatch =>
  dispatch(fetchList(href));

/**
 * Reload a list
 */
export const reloadList = (): ThunkAction => (dispatch, getState) => {
  const currentListHref = getState().caseview
    ? getState().caseview.panelCollection.activeHref
    : getState().tabcomponent.selfhref;

  return dispatch(fetchList(currentListHref));
};

/**
 * Goto a list item
 */
const gotoListItemAction = (list, detailHref) => {
  const listitem = list.getListItemByHref(detailHref);

  return {
    [MODULARUI]: {
      href: detailHref,
      targetModel: ListDetailModel,
      listitem,
      successAction: listDetail => {
        const listWithDetail = list.clone();
        listWithDetail.detail = listDetail;

        return receiveListWithItem(listWithDetail);
      }
    }
  };
};

export const gotoListItem = (
  list: ListModel,
  href: Href
): ThunkAction => dispatch => dispatch(gotoListItemAction(list, href));

/**
* Change page number
*/
export const updatePaging = (href: Href) => requestList(href);

/**
* Change page size
*/
export const updatePageSize = (href: Href) => requestList(href);

/**
* Handle sort change
*/
export const updateSorting = (href: Href) => requestList(href);

const fetchListContextDetailItem = (list: ListModel, detailHref: Href) => ({
  [MODULARUI]: {
    href: detailHref,
    targetModel: ListDetailModel,
    successAction: listdetail => {
      const newList = list.clone();

      newList.detail = listdetail;

      return receiveListContext(newList);
    }
  }
});

const fetchListContextItem = (listHref: Href, detailHref: Href | null) => ({
  [MODULARUI]: {
    href: listHref,
    targetModel: ListModel,
    successAction: list => {
      if (!detailHref) {
        return receiveListContext(list);
      }

      return fetchListContextDetailItem(list, detailHref);
    }
  }
});

/**
 * Goto list context item
 */
export const gotoListContextItem = (
  contextItem: ContextItemModel
): ThunkAction => dispatch =>
  dispatch(fetchListContextItem(contextItem.href, contextItem.detailHref));
