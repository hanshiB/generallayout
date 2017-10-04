// @flow
import React from "react";

import ChoiceAttribute from "beinformed/modules/FormAttribute/ChoiceAttribute";
import CompositeAttribute from "beinformed/modules/FormAttribute/CompositeAttribute";
import DatetimeAttribute from "beinformed/modules/FormAttribute/DatetimeAttribute";
import LabelAttribute from "beinformed/modules/FormAttribute/LabelAttribute";
import HelptextAttribute from "beinformed/modules/FormAttribute/HelptextAttribute";
import LookupAttribute from "beinformed/modules/FormAttribute/LookupAttribute";
import MemoAttribute from "beinformed/modules/FormAttribute/MemoAttribute";
import MoneyAttribute from "beinformed/modules/FormAttribute/MoneyAttribute";
import NumberAttribute from "beinformed/modules/FormAttribute/NumberAttribute";
import PasswordAttribute from "beinformed/modules/FormAttribute/PasswordAttribute";
import RangeAttribute from "beinformed/modules/FormAttribute/RangeAttribute";
import StringAttribute from "beinformed/modules/FormAttribute/StringAttribute";
import UploadAttribute from "beinformed/modules/FormAttribute/UploadAttribute";
import XMLAttribute from "beinformed/modules/FormAttribute/XMLAttribute";

import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type FormAttributeProps = {
  attribute: AttributeType,
  className?: string,
  questionContentConfiguration?: ?ContentConfigurationElements,
  optionContentConfiguration?: ?ContentConfigurationElements,
  id: string,
  isFilter?: boolean,
  name: string,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange?: (attribute: AttributeType, value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void,
  onSubmit?: Function
};

/**
 * Render correct Form Group
 */
const FormAttribute = ({ attribute, name, ...props }: FormAttributeProps) => {
  const attributeMap = {
    lookup: LookupAttribute,
    choice: ChoiceAttribute,
    date: DatetimeAttribute,
    time: DatetimeAttribute,
    timestamp: DatetimeAttribute,
    composite: CompositeAttribute,
    range: RangeAttribute,
    helptext: HelptextAttribute,
    label: LabelAttribute,
    memo: MemoAttribute,
    money: MoneyAttribute,
    number: NumberAttribute,
    password: PasswordAttribute,
    upload: UploadAttribute,
    xml: XMLAttribute,
    string: StringAttribute
  };

  const attributeType =
    attribute.type in attributeMap ? attribute.type : "string";
  const Attribute = attributeMap[attributeType];

  return (
    <Attribute attribute={attribute} name={name || attribute.name} {...props} />
  );
};

export default FormAttribute;
