// @flow
import React from "react";

import ConceptHeader from "beinformed/modules/ConceptDetail/ConceptHeader";
import ConceptLabels from "beinformed/modules/ConceptDetail/ConceptLabels";
import ConceptFormula from "beinformed/modules/ConceptDetail/ConceptFormula";
import ConceptProperties from "beinformed/modules/ConceptDetail/ConceptProperties";
import ConceptRelations from "beinformed/modules/ConceptDetail/ConceptRelations";
import SourceReferences from "beinformed/modules/ConceptDetail/SourceReferences";
import ConceptTextFragments from "beinformed/modules/ConceptDetail/ConceptTextFragments";
import BusinessScenario from "beinformed/modules/ModelOverview/BusinessScenario";

import "./ConceptDetail.scss";

import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";

type ConceptDetailType = {
  conceptDetail: ConceptDetailModel,
  onConceptClick: Function,
  onContentClick: Function
};

const BUSINESS_SCENARIO_CONCEPT_TYPE =
  "/concepttypes/Library/KMTs/Business scenarios.bixml/BusinessScenario";

/**
 * Concept detail
 */
const ConceptDetail = ({
  conceptDetail,
  onConceptClick,
  onContentClick
}: ConceptDetailType) => (
  <div className="concept-detail">
    <ConceptHeader concept={conceptDetail} />

    <div className="row">
      {conceptDetail.relationsCollection.hasItems && (
        <div className="col-lg-2">
          <ConceptRelations
            relations={conceptDetail.relationsCollection}
            onConceptClick={onConceptClick}
          />
        </div>
      )}

      <div className="col-lg-10">
        {conceptDetail.conceptType.selfhref.path ===
          BUSINESS_SCENARIO_CONCEPT_TYPE && (
          <BusinessScenario
            concept={conceptDetail}
            onConceptClick={onConceptClick}
          />
        )}
        {conceptDetail.labels.length > 0 && (
          <ConceptLabels labels={conceptDetail.labels} />
        )}
        {conceptDetail.formula && (
          <ConceptFormula formula={conceptDetail.formula} />
        )}
        {conceptDetail.conceptProperties.length > 0 && (
          <ConceptProperties properties={conceptDetail.conceptProperties} />
        )}
        {conceptDetail.textfragments.length > 0 && (
          <ConceptTextFragments textfragments={conceptDetail.textfragments} />
        )}
        {conceptDetail.sourceReferenceCollection.hasItems && (
          <SourceReferences
            sourceReferences={conceptDetail.sourceReferenceCollection}
            sources={conceptDetail.content}
            onContentClick={onContentClick}
          />
        )}
      </div>
    </div>
  </div>
);

export default ConceptDetail;
