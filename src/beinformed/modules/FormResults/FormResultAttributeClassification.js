// @flow
import React from "react";
import classNames from "classnames";

import Icon from "beinformed/modules/Icon/Icon";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";

import "./FormResultAttributeClassification.scss";

import type ContentConfigurationResults from "beinformed/models/contentconfiguration/ContentConfigurationResults";

type FormResultAttributeProps = {
  id: string,
  attribute: AttributeType,
  contentConfiguration?: ?ContentConfigurationResults
};

const FormResultAttributeClassification = ({
  contentConfiguration,
  attribute,
  id
}: FormResultAttributeProps) => (
  <div className="form-result-taxonomy form-group" data-name={attribute.name}>
    <div className="form-label" id={`${id}-label`}>
      {attribute.label}
    </div>
    <div role="group" aria-label={attribute.label}>
      {attribute.options.all.map((option, i) => (
        <div
          key={i}
          className={classNames("form-result-option", {
            active: option.selected
          })}
        >
          <div key={i} className="form-result-option-label">
            <Icon name={option.selected ? "check" : "times"} textAfter />
            {option.label}
          </div>
          {contentConfiguration && (
            <FormContentRenderer
              concept={option.concept}
              contentConfiguration={
                option.selected
                  ? contentConfiguration.positiveResultElements
                  : contentConfiguration.negativeResultElements
              }
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default FormResultAttributeClassification;
