// @flow
import React, { Component } from "react";

import ModularUI from "beinformed/modularui/ModularUI";

import { Message, injectMessage } from "beinformed/modules/I18n/Message";
import Link from "beinformed/modules/Link/Link";
import { BASE, TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";
import {
  BUSINESS_MODEL_OVERVIEW_CONCEPT_TYPES,
  TARGET_OPERATING_MODEL_CONCEPT_TYPES
} from "beinformed/modules/ModelOverview/ModelOverviewConstants";
import Href from "beinformed/models/href/Href";
import BaseCollection from "beinformed/models/base/BaseCollection";

import "./ModelOverview.scss";

import type ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";
import type ConceptLinkModel from "beinformed/models/concepts/ConceptLinkModel";

type ModelOverviewProps = {
  conceptIndex: ConceptIndexModel,
  defaultOverview: "tom" | "bmo",
  onConceptClick: (href: Href) => void,
  onStart: () => void,
  onFinish: () => void
};

type ModelOverviewState = {
  overview: "tom" | "bmo",
  businessModelOverview: ConceptIndexModel | null,
  targetOperatingModel: ConceptIndexModel | null
};

const CONCEPTTYPE_PATH = "/concepttypes";

/**
 * Renders a concept that is part of a business model overview lane
 */
const ModelOverviewConcept = ({
  concept,
  message,
  onConceptClick
}: {
  concept: ConceptLinkModel,
  message: messageFunctionType,
  onConceptClick: Function
}) => {
  const conceptStyle = {
    backgroundColor: concept.conceptType.backgroundColor,
    color: concept.conceptType.textColor,
    borderColor: concept.conceptType.lineColor
  };

  return (
    <Link
      style={conceptStyle}
      className="model-overview-lane-concept"
      dataId={concept.key}
      href={concept.selfhref}
      onClick={onConceptClick}
    >
      {concept.conceptType &&
        concept.conceptType.icon && (
          <img
            className="concept-icon"
            src={`${BASE}${concept.conceptType.icon}`}
            alt={message(
              "Concept.Icon.AltText",
              `Icon of ${concept.conceptType.label}`,
              { SUBJECT: concept.conceptType.label }
            )}
          />
        )}
      <span>{concept.label}</span>
    </Link>
  );
};

const ModelOverviewConceptWithMessage = injectMessage(ModelOverviewConcept);

/**
 * Renders the business model overview lane
 */
const ModelOverviewLane = ({
  lane,
  concepts,
  onConceptClick
}: {
  lane: Object,
  concepts: ConceptLinkModel[],
  onConceptClick: Function
}) => {
  const laneKey = Object.keys(lane)[0];
  const laneConcepts = [];

  lane[laneKey].conceptTypes.forEach(conceptType => {
    const filteredConcepts = concepts.filter(
      concept => concept.concepttypeHref.path === CONCEPTTYPE_PATH + conceptType
    );

    laneConcepts.push(...filteredConcepts);
  });

  if (laneConcepts.length > 0) {
    return (
      <div className="model-overview-lane">
        <h3 className="lane-title" data-id={laneKey}>
          <Message
            id={`ModelOverviewLane.${lane[laneKey].id}`}
            defaultMessage={lane[laneKey].id}
          />
        </h3>
        {laneConcepts.map((concept, idx) => (
          <ModelOverviewConceptWithMessage
            key={`${laneKey}-${concept.key}-${idx}`}
            concept={concept}
            onConceptClick={onConceptClick}
          />
        ))}
      </div>
    );
  }

  return null;
};

/**
 * Renders the business model overview
 */
class ModelOverview extends Component<ModelOverviewProps, ModelOverviewState> {
  defaultTypes = {
    defaultOverview: "tom"
  };

  constructor(props: ModelOverviewProps) {
    super(props);

    this.state = {
      overview: props.defaultOverview || "tom",
      businessModelOverview: null,
      targetOperatingModel: null
    };
  }

  componentDidMount() {
    this.getModelOverview("bmo");
    this.getModelOverview("tom");
  }

  getModelOverviewHref(type: "bmo" | "tom") {
    const conceptTypes =
      type === "bmo"
        ? BUSINESS_MODEL_OVERVIEW_CONCEPT_TYPES
        : TARGET_OPERATING_MODEL_CONCEPT_TYPES;
    const conceptTypeFilter = conceptTypes
      .map(lane => lane[Object.keys(lane)[0]].conceptTypes)
      .join(",");

    const indexHref = new Href(this.props.conceptIndex.selfhref.path);
    indexHref.addParameter("type", conceptTypeFilter);
    indexHref.addParameter(
      TIMEVERSION_FILTER_NAME,
      this.props.conceptIndex.entryDate
    );

    return indexHref;
  }

  /**
   * For the TOM the indexmodel needs to be filtered from concepts that are grouped into a capability,
   * therefor all concepts that have an incoming contains relation from a 'capability' concepttype are filtered out
   */
  filterCapabilities(indexmodel: ConceptIndexModel): Promise<any> {
    const capabilities = [
      "/concepttypes/Library/KMTs/Business architecture.bixml/CustomerSegment",
      "/concepttypes/Library/KMTs/Business architecture.bixml/InteractionChannel",
      "/concepttypes/Library/KMTs/Business architecture.bixml/ProductFamily",
      "/concepttypes/Library/KMTs/Business architecture.bixml/SharedPolicy",
      "/concepttypes/Library/KMTs/Business architecture.bixml/BusinessFunction",
      "/concepttypes/Library/KMTs/Business architecture.bixml/RegistrationFunction"
    ];

    const fetchModels = indexmodel.items.all.map(model => {
      const request = new ModularUI(model.selfhref);
      return request.fetch();
    });

    return Promise.all(fetchModels).then(concepts => {
      const filteredConcepts = concepts.filter(concept => {
        const findRel = concept.relationsCollection.find(
          relation =>
            relation.key === "contains" &&
            relation.direction === "incoming" &&
            capabilities.includes(relation.concept.concepttypeHref.href)
        );

        return findRel === null;
      });

      const filteredIndex = indexmodel.clone();

      filteredIndex.items = new BaseCollection();
      filteredIndex.items.collection = indexmodel.items.all.filter(
        item =>
          typeof filteredConcepts.find(concept =>
            concept.selfhref.equals(item.selfhref)
          ) !== "undefined"
      );

      return filteredIndex;
    });
  }

  getConceptsWithTypes(
    conceptIndex: ConceptIndexModel,
    type: "bmo" | "tom"
  ): Promise<any> {
    const conceptIndexConceptRequests = conceptIndex.items.all.map(
      conceptLink => {
        const request = new ModularUI(conceptLink.concepttypeHref);
        return request.fetchFromCache().then(conceptTypeModel => {
          const conceptLinkWithType = conceptLink;

          conceptLinkWithType.conceptType = conceptTypeModel;

          return conceptLinkWithType;
        });
      }
    );

    return Promise.all(conceptIndexConceptRequests).then(
      () =>
        type === "bmo" ? conceptIndex : this.filterCapabilities(conceptIndex)
    );
  }

  getModelOverview(type: "bmo" | "tom") {
    const request = new ModularUI(this.getModelOverviewHref(type));

    this.props.onStart();
    // eslint-disable-next-line promise/catch-or-return
    request
      .fetchFromCache()
      .then(conceptIndex => this.getConceptsWithTypes(conceptIndex, type))
      .then(overview => {
        // eslint-disable-next-line promise/always-return
        if (type === "bmo") {
          this.setState({
            businessModelOverview: overview
          });
        } else if (type === "tom") {
          this.setState({
            targetOperatingModel: overview
          });
        }

        this.props.onFinish();
      });
  }

  renderTOM() {
    const { businessModelOverview, targetOperatingModel } = this.state;

    const { onConceptClick } = this.props;

    if (targetOperatingModel && targetOperatingModel.items.hasItems) {
      return (
        <div className="model-overview-tom">
          <input
            type="radio"
            name="overview-type"
            value="tom"
            id="overview-tom"
            checked={this.state.overview === "tom"}
            className="overview-type-toggle"
            onChange={() =>
              this.setState({
                overview: "tom"
              })}
          />
          <div className="model-overview">
            <h2>
              <Message
                id="TargetOperatingModel.Header"
                defaultMessage="Target operating model"
              />
            </h2>
            {businessModelOverview &&
              businessModelOverview.items.hasItems && (
                <label
                  htmlFor="overview-bmo"
                  className="btn btn-sm btn-light mb-1 float-right"
                >
                  <Message
                    id="BusinessModelOverview.Header"
                    defaultMessage="Business model overview"
                  />
                </label>
              )}
            {TARGET_OPERATING_MODEL_CONCEPT_TYPES.map(lane => (
              <ModelOverviewLane
                key={Object.keys(lane)[0]}
                lane={lane}
                concepts={targetOperatingModel.items.all}
                onConceptClick={onConceptClick}
              />
            ))}
          </div>
        </div>
      );
    }

    return null;
  }

  renderBMO() {
    const { businessModelOverview, targetOperatingModel } = this.state;

    const { onConceptClick } = this.props;

    if (businessModelOverview && businessModelOverview.items.hasItems) {
      return (
        <div className="model-overview-bmo">
          <input
            type="radio"
            name="overview-type"
            value="bmo"
            id="overview-bmo"
            checked={this.state.overview === "bmo"}
            className="overview-type-toggle"
            onChange={() =>
              this.setState({
                overview: "bmo"
              })}
          />
          <div className="model-overview">
            <h2>
              <Message
                id="BusinessModelOverview.Header"
                defaultMessage="Business model overview"
              />
            </h2>
            {targetOperatingModel &&
              targetOperatingModel.items.hasItems && (
                <label
                  htmlFor="overview-tom"
                  className="btn btn-sm btn-light mb-1 float-right"
                >
                  <Message
                    id="TargetOperatingModel.Header"
                    defaultMessage="Target operating model"
                  />
                </label>
              )}
            {BUSINESS_MODEL_OVERVIEW_CONCEPT_TYPES.map(lane => (
              <ModelOverviewLane
                key={Object.keys(lane)[0]}
                lane={lane}
                concepts={businessModelOverview.items.all}
                onConceptClick={onConceptClick}
              />
            ))}
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="model-overviews">
        {this.renderTOM()}
        {this.renderBMO()}
      </div>
    );
  }
}

export default ModelOverview;
