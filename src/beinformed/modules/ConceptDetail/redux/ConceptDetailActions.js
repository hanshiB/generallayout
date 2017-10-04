// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";

import ModularUI from "beinformed/modularui/ModularUI";

import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import type Href from "beinformed/models/href/Href";
import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";

export type receiveConceptDetailType = {
  type: "RECEIVE_CONCEPTDETAIL",
  payload: ConceptDetailModel
};

// ACTIONS
/**
 * Send receive action for concept detail
 */
export const receiveConceptDetail = (
  conceptDetail: ConceptDetailModel
): receiveConceptDetailType => ({
  type: "RECEIVE_CONCEPTDETAIL",
  payload: conceptDetail
});

/**
 * Retriewve concept relations with concept type
 */
const getConceptRelationsWithConceptType = (relations, locale) =>
  relations.map(conceptRelation =>
    new ModularUI(conceptRelation.concept.concepttypeHref)
      .setLocale(locale)
      .fetchFromCache()
      .then(conceptTypeModel => {
        const conceptRelationWithType = conceptRelation;
        conceptRelationWithType.concept.conceptType = conceptTypeModel;
        return conceptRelationWithType;
      })
  );

/**
 * Retrieve content references
 */
const getContentReferencesWithContentType = (sourceReferences, locale) =>
  sourceReferences.map(sourceReference => {
    if (sourceReference.link.contenttypeHref !== null) {
      return new ModularUI(sourceReference.link.contenttypeHref)
        .setLocale(locale)
        .fetchFromCache()
        .then(contentTypeModel => {
          const sourceReferenceWithType = sourceReference;

          sourceReferenceWithType.contentType = contentTypeModel;

          return sourceReferenceWithType;
        });
    }

    return Promise.resolve();
  });

/**
 * Retrieve content for concept
 */
const getConceptContent = (conceptDetail, entryDate: string) =>
  conceptDetail.sourceReferenceCollection
    .filter(
      (sourceReference, index, self) =>
        self.findIndex(selfRef =>
          selfRef.link.selfhref.equals(sourceReference.link.selfhref)
        ) === index
    )
    .map(sourceReference => {
      const contentHrefInTime = sourceReference.link.selfhref.addParameter(
        TIMEVERSION_FILTER_NAME,
        entryDate
      );

      return new ModularUI(contentHrefInTime)
        .setLocale(conceptDetail.locale)
        .fetchFromCache()
        .then(contentdetail => {
          conceptDetail.addContent(contentdetail);

          return conceptDetail;
        });
    });

/**
 * Handles returned concept detail and gets other elements
 */
export const finalizeConceptInformation = (
  href: Href,
  entryDate: string,
  conceptDetail: ConceptDetailModel
): Promise<any> =>
  Promise.all([
    ...getConceptRelationsWithConceptType(
      conceptDetail.relationsCollection.all,
      conceptDetail.locale
    ),
    ...getContentReferencesWithContentType(
      conceptDetail.sourceReferenceCollection.all,
      conceptDetail.locale
    ),
    ...getConceptContent(conceptDetail, entryDate)
  ]).then(() => conceptDetail);

const fetchConceptDetail = (href: Href, entryDate: string) => ({
  [MODULARUI]: {
    href,
    updateBrowserLocation: href,
    successAction: (conceptDetail: ConceptDetailModel) =>
      finalizeConceptInformation(
        href,
        entryDate,
        conceptDetail
      ).then(conceptdetailWithContent =>
        receiveConceptDetail(conceptdetailWithContent)
      )
  }
});

/**
 * Goto concept detail
 */
export const gotoConceptDetail = (href: Href): ThunkAction => (
  dispatch,
  getState
) => {
  const entryDate = getState().modelcatalog.entryDate;

  const conceptHrefInTime = href.addParameter(
    TIMEVERSION_FILTER_NAME,
    entryDate
  );

  return dispatch(fetchConceptDetail(conceptHrefInTime, entryDate));
};
