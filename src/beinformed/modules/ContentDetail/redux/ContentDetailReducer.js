// @flow
import type ContentTOCModel from "beinformed/models/content/ContentTOCModel";
import type ContentModel from "beinformed/models/content/ContentModel";

export type ContentDetailState = {
  contentTOC: ContentTOCModel | null,
  contentDetail: ContentModel | null
};

// REDUCER
const initialState = {
  contentTOC: null,
  contentDetail: null
};

/**
 * Form reducer
 */
export default function contentReducer(
  state: ContentDetailState = initialState,
  action: Action
) {
  switch (action.type) {
    case "RECEIVE_CONTENTINDEX":
    case "RECEIVE_CONCEPTDETAIL":
      return {
        ...state,
        contentTOC: null,
        contentDetail: null
      };

    case "RECEIVE_CONTENTTOC":
      return {
        ...state,
        contentTOC: action.payload
      };

    case "RECEIVE_CONTENTDETAIL":
      return {
        ...state,
        contentDetail: action.payload
      };

    default:
      return state;
  }
}
