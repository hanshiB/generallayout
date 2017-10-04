// @flow
import React from "react";
import classNames from "classnames";

import FormResultAttribute from "beinformed/modules/FormResults/FormResultAttribute";
import FormattedText from "beinformed/modules/FormattedText/FormattedText";

import ContentConfigurationResults from "beinformed/models/contentconfiguration/ContentConfigurationResults";

import "./FormResult.scss";

type FormResultProps = {
  className?: string,
  attributes: Array<AttributeType>,
  id: string,
  contentConfiguration?: ?ContentConfigurationResults
};

/**
 * Render form result objects of a form
 */
const FormResult = ({
  className,
  attributes,
  contentConfiguration,
  id
}: FormResultProps) => (
  <div className={classNames("form-result", className)}>
    {contentConfiguration && (
      <div className="form-result-header">
        <h3 className="form-result-title">{contentConfiguration.label}</h3>
        {contentConfiguration.description && (
          <FormattedText
            className="form-result-description"
            text={contentConfiguration.description}
          />
        )}
      </div>
    )}

    {attributes &&
      attributes.map((attribute, i) => (
        <FormResultAttribute
          key={`${id}-${attribute.name}-${i}`}
          id={`${id}-${attribute.name}`}
          attribute={attribute}
          contentConfiguration={contentConfiguration}
        />
      ))}
  </div>
);

export default FormResult;
