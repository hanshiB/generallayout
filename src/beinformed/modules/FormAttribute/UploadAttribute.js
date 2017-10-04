// @flow
import React from "react";
import classNames from "classnames";

import UploadInput from "beinformed/modules/FormInput/UploadInput";
import FormAssistant from "beinformed/modules/FormAssistant/FormAssistant";
import FormLabel from "beinformed/modules/FormLabel/FormLabel";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";
import type UploadAttributeModel from "beinformed/models/attributes/UploadAttributeModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
type UploadAttributeProps = {
  attribute: UploadAttributeModel,
  className?: string,
  questionContentConfiguration?: ContentConfigurationElements,
  id: string,
  name: string,
  formLayout?: "vertical" | "horizontal",
  onChange: (attribute: UploadAttributeModel, value: string) => void,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render upload form group
 */
const UploadAttribute = ({
  attribute,
  questionContentConfiguration,
  className,
  id,
  name,
  formLayout,
  onChange,
  onBlur,
  onFocus
}: UploadAttributeProps) => {
  const groupClass = classNames("form-group row uploadwidget", className, {
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
        <UploadInput
          name={name}
          id={id}
          value={attribute.inputvalue}
          isMultiple={attribute.multiple}
          uploadConstraints={attribute.uploadConstraints}
          postfix={attribute.postfix}
          prefix={attribute.prefix}
          readOnly={attribute.readonly}
          inError={attribute.inError()}
          placeholder={attribute.placeholder}
          layouthint={attribute.layouthint}
          onChange={uploadtokens => onChange(attribute, uploadtokens)}
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

export default UploadAttribute;
