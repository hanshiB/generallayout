// @flow
import React from "react";
import classNames from "classnames";

import FormattedText from "beinformed/modules/FormattedText/FormattedText";
import type HelptextAttributeModel from "beinformed/models/attributes/HelptextAttributeModel";
type HelptextAttributeProps = {
  attribute: HelptextAttributeModel,
  className?: string
};

/**
 * Render helptext attribute
 */
const HelptextAttribute = ({
  className,
  attribute
}: HelptextAttributeProps) => {
  const helptextClass = classNames("text-muted helptextwidget", className);

  if (attribute.text !== null) {
    return (
      <FormattedText
        dataName={attribute.name}
        className={helptextClass}
        text={attribute.text}
      />
    );
  }

  return null;
};

export default HelptextAttribute;
