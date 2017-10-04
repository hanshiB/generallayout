// @flow
import React from "react";
import classNames from "classnames";

import AddOnButton from "beinformed/modules/Button/AddOnButton";
import TextInput from "beinformed/modules/FormInput/TextInput";
import FormAssistant from "beinformed/modules/FormAssistant/FormAssistant";
import FormLabel from "beinformed/modules/FormLabel/FormLabel";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";
import Icon from "beinformed/modules/Icon/Icon";

import { Message } from "beinformed/modules/I18n/Message";

import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type StringAttributeProps = {
  attribute: StringAttributeModel | NumberAttributeModel | MoneyAttributeModel,
  className?: string,
  questionContentConfiguration?: ?ContentConfigurationElements,
  id?: string,
  isFilter?: boolean,
  name: string,
  autoFocus?: boolean,
  formLayout?: "vertical" | "horizontal",
  onChange: (attribute: StringAttributeModel, value: string) => void,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render string
 */
const StringAttribute = ({
  attribute,
  className,
  questionContentConfiguration,
  isFilter,
  name,
  id,
  autoFocus,
  formLayout,
  onBlur,
  onChange,
  onFocus
}: StringAttributeProps) => {
  const groupClass = classNames("form-group row stringwidget", className, {
    "has-danger": attribute.inError()
  });

  return (
    <div className={groupClass} data-name={name}>
      <FormLabel
        htmlFor={id || name}
        defaultLabel={attribute.label}
        concept={attribute.concept}
        content={attribute.content}
        contentConfiguration={questionContentConfiguration}
        isMandatory={attribute.mandatory}
        formLayout={formLayout}
      />
      <div className="col">
        <TextInput
          name={name}
          id={id}
          value={
            attribute.readonly ? attribute.readonlyvalue : attribute.inputvalue
          }
          prefix={attribute.prefix}
          postfix={attribute.postfix}
          readOnly={attribute.readonly}
          placeholder={attribute.placeholder}
          inError={attribute.inError()}
          autoFocus={autoFocus}
          layouthint={attribute.layouthint}
          onChange={inputvalue => onChange(attribute, inputvalue)}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          {isFilter && (
            <AddOnButton className="filter-button">
              <Icon name="filter" />
              <Message
                id="FilterButton.Label"
                defaultMessage="Filter"
                screenreaderOnly
              />
            </AddOnButton>
          )}
        </TextInput>

        {(attribute.assistantMessage ||
          attribute.constraintCollection.hasItems) && (
          <FormAssistant
            assistantMessage={attribute.assistantMessage}
            constraints={attribute.constraintCollection}
            errors={attribute.errorCollection}
            value={attribute.inputvalue}
          />
        )}

        <FormContentRenderer
          concept={attribute.concept}
          contentConfiguration={questionContentConfiguration}
        />
      </div>
    </div>
  );
};

export default StringAttribute;
