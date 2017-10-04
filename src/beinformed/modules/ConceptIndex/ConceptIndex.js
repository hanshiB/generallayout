// @flow
import React from "react";

import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";
import ConceptLink from "beinformed/modules/ConceptDetail/ConceptLink";
import CharIndex from "beinformed/modules/CharIndex/CharIndex";
import { Message } from "beinformed/modules/I18n/Message";

import "./ConceptIndex.scss";

import type ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";

type ConceptIndexType = {
  conceptIndex: ConceptIndexModel,
  onCharClick: Function,
  onConceptClick: Function
};

/**
 * Concept index
 */
const ConceptIndex = ({
  conceptIndex,
  onCharClick,
  onConceptClick
}: ConceptIndexType) => {
  const indexFilterAttribute =
    conceptIndex.indexfilter &&
    conceptIndex.indexfilter.attribute instanceof ChoiceAttributeModel &&
    conceptIndex.indexfilter.attribute;

  return (
    <div className="catalog-index concept-index">
      <h2>
        <Message id="ConceptIndex.Header" defaultMessage="Concept index" />
      </h2>
      {indexFilterAttribute && (
        <div className="char-index">
          <CharIndex
            active={indexFilterAttribute.selected}
            enabled={indexFilterAttribute.options.all.map(
              option => option.code
            )}
            href={conceptIndex.selfhref}
            onSelect={onCharClick}
          />
        </div>
      )}
      {conceptIndex.items.hasItems && (
        <ul className="nav flex-column mb-1 concept-index-concepts">
          {conceptIndex.items.all.map((concept, idx) => (
            <li key={`${concept.key}-${idx}`} className="nav-item">
              <ConceptLink concept={concept} onClick={onConceptClick} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConceptIndex;
