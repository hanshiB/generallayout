// @flow
import React from "react";
import classNames from "classnames";

import PasswordInput from "beinformed/modules/FormInput/PasswordInput";
import FormAssistant from "beinformed/modules/FormAssistant/FormAssistant";
import FormLabel from "beinformed/modules/FormLabel/FormLabel";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
import type PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";
type PasswordAttributeProps = {
  attribute: PasswordAttributeModel,
  className?: string,
  questionContentConfiguration?: ContentConfigurationElements,
  id?: string,
  isLogin?: boolean,
  name: string,
  formLayout?: "vertical" | "horizontal",
  onChange: (attribute: PasswordAttributeModel, value: string) => void,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render password form group
 */
const PasswordAttribute = ({
  className,
  questionContentConfiguration,
  attribute,
  isLogin,
  name,
  id,
  formLayout,
  onChange,
  onBlur,
  onFocus
}: PasswordAttributeProps) => {
  const groupClass = classNames("form-group row", "passwordwidget", className, {
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
        <PasswordInput
          name={name}
          id={id}
          value={attribute.inputvalue}
          readOnly={attribute.readonly}
          postfix={attribute.postfix}
          prefix={attribute.prefix}
          isLogin={isLogin}
          placeholder={attribute.placeholder}
          inError={attribute.inError()}
          layouthint={attribute.layouthint}
          onChange={inputvalue => onChange(attribute, inputvalue)}
          onBlur={onBlur}
          onFocus={onFocus}
        />
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

export default PasswordAttribute;
