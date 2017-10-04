// @flow
import React from "react";

import type Href from "beinformed/models/href/Href";
import Link from "beinformed/modules/Link/Link";

import { Message } from "beinformed/modules/I18n/Message";

import "./BusinessScenario.scss";

const MARGIN_LEFT = 80;
const MARGIN_TOP = 13;
const HORIZONTAL_DISTANCE = 150;
const VERTICAL_DISTANCE = 80;
const STEP_LABEL_MAX_LINES = 4;

const Actor = ({
  Y,
  label,
  href,
  onConceptClick
}: {
  Y: number,
  label: string,
  href: Href,
  onConceptClick: (href: Href) => void
}) => (
  <div
    className="business-scenario-actor"
    style={{ top: Y * VERTICAL_DISTANCE + 2 }}
  >
    <i className="fa fa-user" aria-hidden="true" />{" "}
    <Link href={href} onClick={onConceptClick}>
      {label}
    </Link>
  </div>
);

const ScenarioLine = ({ Y }: { Y: number }) => (
  <line
    x1="0"
    y1={Y * VERTICAL_DISTANCE + MARGIN_TOP}
    x2="100%"
    y2={Y * VERTICAL_DISTANCE + MARGIN_TOP}
    stroke="#dddddd"
    strokeWidth="1px"
  />
);

const StepLabel = ({ X, Y, text }: { X: number, Y: number, text: string }) => {
  const MAX_CHARS = 20;

  const lines = [];

  let line = "";
  text.split(" ").forEach(word => {
    if (`${line} ${word}`.length > MAX_CHARS) {
      lines.push(line);
      line = word;
    } else {
      line = `${line} ${word}`;
    }
  });
  lines.push(line);

  const MARGIN_TEXT = 20;
  return (
    <text
      className="step-label"
      x={X}
      y={Y + MARGIN_TEXT}
      dy="0.71em"
      width="85"
      fontSize="12px"
      textAnchor="middle"
    >
      {lines.map((lineItem, i) => {
        if (i < STEP_LABEL_MAX_LINES) {
          return (
            <tspan key={i} x={X} y={Y + MARGIN_TEXT} dy={`${i}em`}>
              {lineItem}
              {i === STEP_LABEL_MAX_LINES - 1 &&
              lines.length > STEP_LABEL_MAX_LINES
                ? "..."
                : ""}
            </tspan>
          );
        }
        return null;
      })}
    </text>
  );
};

const Step = ({
  X,
  Y,
  label,
  href,
  onConceptClick
}: {
  X: number,
  Y: number,
  label: string,
  href: Href,
  onConceptClick: (href: Href) => void
}) => {
  const stepX = X * HORIZONTAL_DISTANCE + MARGIN_LEFT;
  const stepY = Y * VERTICAL_DISTANCE + MARGIN_TOP;

  const ICON_MARGIN = 4;

  return (
    <Link href={href} onClick={onConceptClick}>
      <circle
        cx={stepX}
        cy={stepY}
        r={10}
        fill="#EF8400"
        stroke="#f7f7f9"
        strokeWidth="0"
      />
      <text
        x={stepX - ICON_MARGIN}
        y={stepY + ICON_MARGIN}
        fontFamily="FontAwesome"
        fontSize="12px"
        fill="#fff"
      >
        {"\uf04b"}
      </text>
      <StepLabel X={stepX} Y={stepY} text={label} />
    </Link>
  );
};

const Connection = ({
  X,
  Y,
  nextY
}: {
  X: number,
  Y: number,
  nextY: number
}) => {
  const startX = X * HORIZONTAL_DISTANCE + MARGIN_LEFT;
  const startY = Y * VERTICAL_DISTANCE + MARGIN_TOP;
  const endX = startX + HORIZONTAL_DISTANCE;
  const endY = nextY * VERTICAL_DISTANCE + MARGIN_TOP;
  const curveX = startX + (endX - startX) / 2;

  return (
    <path
      d={`M${startX} ${startY} L${curveX} ${startY} ${endX} ${endY}`}
      stroke="#f6bb73"
      fill="transparent"
      strokeWidth="2"
    />
  );
};

const BusinessScenario = ({
  concept,
  onConceptClick
}: {
  concept: ConceptDetailModel,
  onConceptClick: (href: Href) => void
}) => {
  const actors = concept.actors;
  let hasScenarioWithoutActors = false;

  const scenarioSteps = concept.scenarioSteps.map((scenarioStep, i) => {
    // Y coordinate of scenario step is the index number of the persona
    // that is related to the scenario step concept.
    const stepY = actors.findIndex(
      actor =>
        typeof scenarioStep.relationsCollection.all.find(
          relation =>
            relation.direction === "outgoing" &&
            relation.concept.concepttypeHref.path ===
              "/concepttypes/Library/KMTs/Business scenarios.bixml/Persona" &&
            relation.concept.selfhref.equals(actor.selfhref)
        ) !== "undefined"
    );

    if (stepY === -1) {
      hasScenarioWithoutActors = true;
    }

    return {
      X: i,
      Y: stepY === -1 ? actors.length : stepY,
      key: scenarioStep.key,
      label: scenarioStep.label,
      href: scenarioStep.selfhref
    };
  });

  if (scenarioSteps.length === 0) {
    return null;
  }

  const nrOfActors = hasScenarioWithoutActors
    ? actors.length + 1
    : actors.length;
  const svgWidth = scenarioSteps.length * HORIZONTAL_DISTANCE + MARGIN_LEFT;
  const svgHeight = nrOfActors * VERTICAL_DISTANCE + MARGIN_TOP;

  return (
    <div className="business-scenario mb-4">
      <h3>
        <Message
          id="BusinessScenario.Header"
          defaultMessage="Business scenario"
        />
      </h3>
      <div className="row">
        {actors.length > 0 && (
          <div
            className="business-scenario-actors col-1"
            style={{ position: "relative" }}
          >
            {actors.map((actor, i) => (
              <Actor
                key={`actor-${actor.key}-${i}`}
                Y={i}
                label={actor.label}
                href={actor.selfhref}
                onConceptClick={onConceptClick}
              />
            ))}
          </div>
        )}
        <div className="business-scenario-steps col">
          <svg width={svgWidth} height={svgHeight}>
            <g>
              {actors.map((actor, i) => (
                <ScenarioLine key={`${actor.key}-${i}`} Y={i} />
              ))}
            </g>

            <g>
              {scenarioSteps.map(
                (scenarioStep, i) =>
                  i < concept.scenarioSteps.length - 1 && (
                    <Connection
                      key={`conn-${scenarioStep.key}-${i}`}
                      X={scenarioStep.X}
                      Y={scenarioStep.Y}
                      nextY={scenarioSteps[i + 1].Y}
                    />
                  )
              )}
            </g>

            <g>
              {scenarioSteps.map((scenarioStep, i) => (
                <Step
                  key={`step-${scenarioStep.key}-${i}`}
                  X={scenarioStep.X}
                  Y={scenarioStep.Y}
                  label={scenarioStep.label}
                  href={scenarioStep.href}
                  onConceptClick={onConceptClick}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BusinessScenario;
