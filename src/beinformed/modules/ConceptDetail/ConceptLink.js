// @flow
import React from "react";

import Link from "beinformed/modules/Link/Link";
import ConceptIcon from "beinformed/modules/ConceptDetail/ConceptIcon";

import "./ConceptLink.scss";

import type ConceptLinkModel from "beinformed/models/concepts/ConceptLinkModel";
import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import type Href from "beinformed/models/href/Href";

type ConceptLinkType = {
  concept: ConceptLinkModel | ConceptDetailModel,
  onClick: (href: Href) => void,
  onEnter?: (e: SyntheticEvent<*>) => void,
  onLeave?: (e: SyntheticEvent<*>) => void
};

/**
 * Concept link
 */
const ConceptLink = ({
  concept,
  onClick,
  onEnter,
  onLeave
}: ConceptLinkType) => (
  <Link
    className="concept-link"
    dataId={concept.key}
    href={concept.selfhref}
    onClick={onClick}
    onEnter={onEnter}
    onLeave={onLeave}
  >
    {concept.conceptType &&
      concept.conceptType.icon && <ConceptIcon concept={concept} />}
    {concept.label}
  </Link>
);

export default ConceptLink;
