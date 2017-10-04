// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";

import type Href from "beinformed/models/href/Href";
import type ContentModel from "beinformed/models/content/ContentModel";
import type ContentTOCModel from "beinformed/models/content/ContentTOCModel";

import RelatedConceptsModel from "beinformed/models/content/RelatedConceptsModel";

import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

export type receiveContentDetailType = {
  type: "RECEIVE_CONTENTDETAIL",
  payload: ContentModel
};
export type receiveContentTOCType = {
  type: "RECEIVE_CONTENTTOC",
  payload: ContentTOCModel
};

/**
 * Receive content detail
 */
export const receiveContentDetail = (
  contentDetail: ContentModel
): receiveContentDetailType => ({
  type: "RECEIVE_CONTENTDETAIL",
  payload: contentDetail
});

/**
 * Receive content toc (source)
 */
export const receiveContentTOC = (
  contentTOC: ContentTOCModel
): receiveContentTOCType => ({
  type: "RECEIVE_CONTENTTOC",
  payload: contentTOC
});

/**
 * Handles a TOC model response
 */
const handleTOCModel = (href, contentTOC, tocOnly): ThunkAction => (
  dispatch,
  getState
) => {
  // When toc has items, retrieve the first item
  if (!tocOnly && contentTOC.items.length > 0) {
    dispatch(receiveContentTOC(contentTOC));

    const firstItemHref = contentTOC.items[0].selfhref;

    firstItemHref.parameter = href.getParameter(TIMEVERSION_FILTER_NAME);

    dispatch(gotoContentDetail(firstItemHref));
  }

  if (
    contentTOC.categories.length > 0 &&
    getState().contentdetail.contentDetail === null
  ) {
    dispatch(receiveContentTOC(contentTOC));

    return dispatch(gotoContentDetail(contentTOC.categories[0].selfhref));
  }

  return dispatch(receiveContentTOC(contentTOC));
};

/**
 * Handle a content detail response
 */
const handleContentModel = (href, contentModel) => {
  // When a link to the related concepts service is present, also fetch this link and add it to the contentdetail
  if (contentModel.relatedConceptsLink) {
    return {
      [MODULARUI]: {
        href: contentModel.relatedConceptsLink.href,
        targetModel: RelatedConceptsModel,
        successAction: relatedConcepts => {
          const contentdetailWithRelated = contentModel.clone();

          contentdetailWithRelated.relatedConcepts = relatedConcepts;

          return receiveContentDetail(contentdetailWithRelated);
        }
      }
    };
  }

  return receiveContentDetail(contentModel);
};

const hasNoTOCInStore = (state, contentdetail) =>
  state.contentdetail.contentTOC === null ||
  !state.contentdetail.contentTOC.selfhref.equals(
    contentdetail.links.getLinkByKey("content").href
  );

/**
 * Goto content detail, this action can receive a content TOC model or a content Section.
 * When a TOC is received, the first section is also requested, when a section is received the toc is also requested.
 */
export const gotoContentDetail = (
  href: Href,
  tocOnly: boolean = false
): ThunkAction => (dispatch, getState) => {
  const entryDate = getState().modelcatalog.entryDate;
  const contentHrefInTime = href.addParameter(
    TIMEVERSION_FILTER_NAME,
    entryDate
  );

  return dispatch({
    [MODULARUI]: {
      href: contentHrefInTime,
      updateBrowserLocation: contentHrefInTime,
      successAction: contentDetail => {
        if (contentDetail.type === "ContentTOC") {
          return handleTOCModel(contentHrefInTime, contentDetail, tocOnly);
        }

        if (hasNoTOCInStore(getState(), contentDetail)) {
          dispatch(handleContentModel(contentHrefInTime, contentDetail));

          const contentTOCHref = contentDetail.links.getLinkByKey("content")
            .href;

          return gotoContentDetail(contentTOCHref, true);
        }

        return handleContentModel(contentHrefInTime, contentDetail);
      }
    }
  });
};
