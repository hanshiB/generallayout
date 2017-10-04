// @flow
import React from "react";
import classNames from "classnames";

import StringAttribute from "beinformed/modules/FormAttribute/StringAttribute";
import type NumberAttributeModel from "beinformed/models/attributes/NumberAttributeModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type NumberAttributeProps = {
  attribute: NumberAttributeModel,
  className?: string,
  questionContentConfiguration?: ContentConfigurationElements,
  id: string,
  isFilter?: boolean,
  name: string,
  formLayout?: "vertical" | "horizontal",
  onChange: (attribute: NumberAttributeModel, value: string) => void,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Renders number widget, same as text widget with different css class
 */
const NumberAttribute = ({
  attribute,
  className,
  onChange,
  ...props
}: NumberAttributeProps) => (
  <StringAttribute
    {...props}
    attribute={attribute}
    className={classNames(className, "numberwidget")}
    onChange={(stringAttribute, inputvalue) => onChange(attribute, inputvalue)}
  />
);

export default NumberAttribute;
