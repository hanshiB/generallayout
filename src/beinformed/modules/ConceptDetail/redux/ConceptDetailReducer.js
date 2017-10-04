// @flow
import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";

export type ConceptDetailState = ConceptDetailModel | null;

// REDUCER
const initialState = null;

/**
 * Form reducer
 */
export default function conceptdetailReducer(
  state: ConceptDetailState = initialState,
  action: Action
) {
  switch (action.type) {
    case "RECEIVE_CONCEPTDETAIL":
      return action.payload;
    case "RECEIVE_MODELCATALOG":
    case "RECEIVE_CONTENTDETAIL":
      return null;
    default:
      return state;
  }
}
