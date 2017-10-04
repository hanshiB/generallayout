// @flow
import React from "react";
import classNames from "classnames";

import LookupInput from "beinformed/modules/FormInput/LookupInput";
import AddOnButton from "beinformed/modules/Button/AddOnButton";
import FormAssistant from "beinformed/modules/FormAssistant/FormAssistant";
import FormLabel from "beinformed/modules/FormLabel/FormLabel";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";
import Icon from "beinformed/modules/Icon/Icon";
import { Message } from "beinformed/modules/I18n/Message";
import type LookupAttributeModel from "beinformed/models/attributes/LookupAttributeModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type LookupAttributeProps = {
  attribute: LookupAttributeModel,
  className?: string,
  questionContentConfiguration?: ContentConfigurationElements,
  optionContentConfiguration?: ContentConfigurationElements,
  id: string,
  isFilter?: boolean,
  name: string,
  formLayout?: "vertical" | "horizontal",
  onChange: (attribute: LookupAttributeModel, value: string) => void,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render Lookup
 */
const LookupAttribute = ({
  attribute,
  className,
  questionContentConfiguration,
  optionContentConfiguration,
  isFilter,
  name,
  id,
  formLayout,
  onChange,
  onBlur,
  onFocus
}: LookupAttributeProps) => {
  const groupClass = classNames("form-group row", "lookupwidget", className, {
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
        <LookupInput
          name={name}
          id={id}
          isMultiple={attribute.isMultiple}
          options={attribute.options}
          optionContentConfiguration={optionContentConfiguration}
          readOnly={attribute.readonly}
          lookupLink={attribute.lookupLink}
          layouthint={attribute.layouthint}
          onChange={option => onChange(attribute, option.code)}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          {isFilter && (
            <AddOnButton className="filter-button">
              <Icon name="filter" textAfter />
              <Message
                id="FilterButton.Label"
                defaultMessage="Filter"
                screenreaderOnly
              />
            </AddOnButton>
          )}
        </LookupInput>
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

export default LookupAttribute;
