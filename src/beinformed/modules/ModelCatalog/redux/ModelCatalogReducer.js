// @flow
import type ModelCatalogModel from "beinformed/models/modelcatalog/ModelCatalogModel";
import type ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";

export type ModelCatalogState = {
  entryDate: string,
  catalog: ModelCatalogModel | null,
  search: ConceptIndexModel | null
};

// REDUCER
const ISO_DATE_SIZE = 10;
const initialState = {
  entryDate: new Date().toISOString().slice(0, ISO_DATE_SIZE),
  catalog: null,
  search: null
};

/**
 * Form reducer
 */
export default function modeloverviewReducer(
  state: ModelCatalogState = initialState,
  action: Action
) {
  switch (action.type) {
    case "RECEIVE_MODELCATALOG":
      return {
        ...state,
        catalog: action.payload
      };

    case "RECEIVE_MODELCATALOG_SEARCHRESULT":
      return {
        ...state,
        search: action.payload
      };

    case "RECEIVE_ENTRYDATE":
      return {
        ...state,
        entryDate: action.payload
      };

    default:
      return state;
  }
}
