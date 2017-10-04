// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";

import ModularUIRequest from "beinformed/modularui/ModularUI";

import Href from "beinformed/models/href/Href";
import {
  startProgress,
  finishProgress
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";
import type ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";

export type receiveConceptIndexType = {
  type: "RECEIVE_CONCEPTINDEX",
  payload: ConceptIndexModel
};

// ACTIONS
/**
 * Receive concept index
 */
export const receiveConceptIndex = (
  conceptIndex: ConceptIndexModel
): receiveConceptIndexType => ({
  type: "RECEIVE_CONCEPTINDEX",
  payload: conceptIndex
});

/**
 * Add concept type to the concept information
 */
export const getConceptsWithType = (
  conceptindex: ConceptIndexModel
): ThunkAction => dispatch => {
  const conceptIndexConcepts = conceptindex.items.all.map(conceptLink => {
    const request = new ModularUIRequest(conceptLink.concepttypeHref);
    return request.fetch().then(conceptTypeModel => {
      const conceptLinkWithType = conceptLink;

      conceptLinkWithType.conceptType = conceptTypeModel;

      return conceptLinkWithType;
    });
  });

  dispatch(startProgress());

  return Promise.all(conceptIndexConcepts).then(() => {
    dispatch(receiveConceptIndex(conceptindex));

    return dispatch(finishProgress());
  });
};

/**
 * Request concept index
 */
export const requestConceptIndex = (
  conceptIndexHref: Href = new Href("/concepts")
) => ({
  [MODULARUI]: {
    href: conceptIndexHref,
    updateBrowserLocation: conceptIndexHref,
    successAction: conceptIndex =>
      conceptIndex.hasIndexFilter() && conceptIndex.hasNoFiltersSet()
        ? gotoConceptCharacter(conceptIndex.getFirstCharHref())
        : getConceptsWithType(conceptIndex)
  }
});

/**
 * Use index filter to go to a character of the concept index
 */
export const gotoConceptCharacter = (charHref: Href) =>
  requestConceptIndex(charHref);
