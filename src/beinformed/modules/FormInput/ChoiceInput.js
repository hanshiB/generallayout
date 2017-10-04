// @flow
import React from "react";

import { Message } from "beinformed/modules/I18n/Message";
import ChoiceInputGroup from "beinformed/modules/FormInput/ChoiceInputGroup";
import InputGroup from "beinformed/modules/FormInput/InputGroup";
import SelectInput from "beinformed/modules/FormInput/SelectInput";
import TreeInput from "beinformed/modules/FormInput/TreeInput";
import type ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type ChoiceInputProps = {
  className?: string,
  disabled?: boolean,
  id: string,
  isTree: boolean,
  label: string,
  name: string,
  optionContentConfiguration?: ContentConfigurationElements | null,
  options: ChoiceAttributeOptionModel[],
  readOnly?: boolean,
  stacked?: boolean,
  type:
    | "checkbox"
    | "radiobutton"
    | "listview"
    | "combobox"
    | "longlist"
    | "table",
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onClick?: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render the a choice input, based on a layout hint
 */
const ChoiceInput = ({
  options,
  isTree,
  type = "checkbox",
  ...props
}: ChoiceInputProps) => {
  if (
    options.length > 0 &&
    isTree &&
    (type === "checkbox" || type === "radiobutton")
  ) {
    return <TreeInput options={options} type={type} {...props} />;
  } else if (
    options.length > 0 &&
    (type === "checkbox" || type === "radiobutton")
  ) {
    return <ChoiceInputGroup options={options} type={type} {...props} />;
  } else if (
    options.length > 0 &&
    (type === "table" ||
      type === "listview" ||
      type === "combobox" ||
      type === "longlist")
  ) {
    return <SelectInput options={options} placeholder="" {...props} />;
  }

  return (
    <InputGroup>
      <p className="text-muted">
        <em>
          {options.length ? (
            <Message
              id="ChoiceField.Msg.NoOptionsAvailable"
              defaultMessage="No options available"
            />
          ) : (
            <Message
              id="ChoiceField.Msg.NotSupported"
              defaultMessage="Input not suported"
            />
          )}
        </em>
      </p>
    </InputGroup>
  );
};

export default ChoiceInput;
