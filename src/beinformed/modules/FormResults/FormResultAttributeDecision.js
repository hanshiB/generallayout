// @flow
import React from "react";
import classNames from "classnames";

import Icon from "beinformed/modules/Icon/Icon";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";

import "./FormResultAttributeDecision.scss";

import type ContentConfigurationResults from "beinformed/models/contentconfiguration/ContentConfigurationResults";

type FormResultAttributeProps = {
  attribute: AttributeType,
  contentConfiguration?: ?ContentConfigurationResults
};

const FormResultAttributeDecision = ({
  contentConfiguration,
  attribute
}: FormResultAttributeProps) => {
  const isSelected =
    attribute.options.selected.length > 0 &&
    attribute.options.selected[0].code === "true";

  return (
    <div
      className={classNames("form-result-decision form-group", {
        active: isSelected
      })}
      data-name={attribute.name}
    >
      <div className="form-label">
        <Icon name={isSelected ? "check" : "times"} textAfter />
        {attribute.label}
      </div>
      {contentConfiguration && (
        <FormContentRenderer
          concept={attribute.concept}
          contentConfiguration={
            isSelected
              ? contentConfiguration.positiveResultElements
              : contentConfiguration.negativeResultElements
          }
        />
      )}
    </div>
  );
};

export default FormResultAttributeDecision;
