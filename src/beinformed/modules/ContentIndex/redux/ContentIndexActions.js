// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";
import ModularUI from "beinformed/modularui/ModularUI";

// import fetchModelFromCache from "beinformed/modularui/fetchModelFromCache";
import Href from "beinformed/models/href/Href";
import {
  startProgress,
  finishProgress
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";
import type ContentIndexModel from "beinformed/models/content/ContentIndexModel";

export type receiveContentIndexType = {
  type: "RECEIVE_CONTENTINDEX",
  payload: ContentIndexModel
};

/**
 * Receive content index
 */
export const receiveContentIndex = (
  contentIndex: ContentIndexModel
): receiveContentIndexType => ({
  type: "RECEIVE_CONTENTINDEX",
  payload: contentIndex
});

/**
 * Add content type information to content
 */
const getContentWithType = (contentindex): ThunkAction => dispatch => {
  const contentIndexContent = contentindex.items.all
    .filter(contentLink => contentLink.contenttypeHref)
    .map(contentLink =>
      new ModularUI(contentLink.contenttypeHref)
        .fetchFromCache()
        .then(contentTypeModel => {
          const contentLinkWithType = contentLink;

          contentLinkWithType.contentType = contentTypeModel;

          return contentLinkWithType;
        })
    );

  dispatch(startProgress());

  return Promise.all(contentIndexContent).then(() => {
    dispatch(receiveContentIndex(contentindex));

    return dispatch(finishProgress());
  });
};

/**
 * Goto content index
 */
export const requestContentIndex = (
  contentIndexHref: Href = new Href("/content")
) => ({
  [MODULARUI]: {
    href: contentIndexHref,
    updateBrowserLocation: contentIndexHref,
    successAction: contentIndex =>
      contentIndex.hasIndexFilter() && contentIndex.hasNoFiltersSet()
        ? gotoContentCharacter(contentIndex.getFirstCharHref())
        : getContentWithType(contentIndex)
  }
});

/**
 * Goto content character
 */
export const gotoContentCharacter = (charHref: Href) =>
  requestContentIndex(charHref);
