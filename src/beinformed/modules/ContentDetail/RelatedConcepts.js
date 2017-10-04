// @flow
import React from "react";

import ConceptLink from "beinformed/modules/ConceptDetail/ConceptLink";
import { Message } from "beinformed/modules/I18n/Message";
import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
type RelatedConceptsType = {
  concepts: ConceptDetailModel[],
  onConceptClick: Function,
  onConceptEnter: Function,
  onConceptLeave: Function
};

/**
 * Related concepts
 */
const RelatedConcepts = ({
  concepts,
  onConceptClick,
  onConceptEnter,
  onConceptLeave
}: RelatedConceptsType) => (
  <div className="concept-relations">
    <h3>
      <Message id="RelatedConcepts.Header" defaultMessage="Related concepts" />
    </h3>
    <ul className="nav flex-column">
      {concepts.map(relatedConcept => (
        <li key={relatedConcept.key} className="nav-item concept-relation">
          <ConceptLink
            concept={relatedConcept}
            onClick={onConceptClick}
            onEnter={() => onConceptEnter(relatedConcept)}
            onLeave={onConceptLeave}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default RelatedConcepts;
