// @flow
import React from "react";

import ConceptLink from "beinformed/modules/ConceptDetail/ConceptLink";
import IconPopover from "beinformed/modules/Popover/IconPopover";
import { injectMessage } from "beinformed/modules/I18n/Message";

import "./ConceptRelations.scss";

import type ConceptRelationCollection from "beinformed/models/concepts/ConceptRelationCollection";
type ConceptRelationsProps = {
  relations: ConceptRelationCollection,
  message: messageFunctionType,
  onConceptClick: Function
};

/**
 * Concept relations
 */
const ConceptRelations = ({
  relations,
  message,
  onConceptClick
}: ConceptRelationsProps) => (
  <div className="concept-relations mb-4">
    {relations.types.map(type => (
      <div key={type.key} className="relation-concepts">
        <h3 className="relation-label">
          <span>{type.label}</span>
          <small className="text-muted">{` (${message(
            `ConceptRelations.${type.direction}`,
            type.direction
          )})`}</small>
        </h3>

        <ul className="nav mb-1 flex-column">
          {relations.byType(type.key).map((relation, j) => (
            <li
              key={`${type.key}-${relation.concept.key}-${j}`}
              className="nav-item relation-concept"
            >
              <ConceptLink
                concept={relation.concept}
                onClick={onConceptClick}
              />
              {relation.textfragments && (
                <IconPopover>
                  {relation.textfragments.map((textFragment, i) => (
                    <div key={textFragment.type + i}>{textFragment.text}</div>
                  ))}
                </IconPopover>
              )}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default injectMessage(ConceptRelations);
