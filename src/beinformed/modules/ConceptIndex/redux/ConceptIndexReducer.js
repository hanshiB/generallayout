// @flow
import type ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";

export type ConceptIndexState = ConceptIndexModel | null;

// REDUCER
const initialState = null;

/**
 * Form reducer
 */
export default function conceptindexReducer(
  state: ConceptIndexState = initialState,
  action: Action
) {
  switch (action.type) {
    case "RECEIVE_CONCEPTINDEX":
      return action.payload;
    default:
      return state;
  }
}
