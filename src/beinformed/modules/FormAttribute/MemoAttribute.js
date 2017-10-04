// @flow
import React from "react";
import classNames from "classnames";

import TextareaInput from "beinformed/modules/FormInput/TextareaInput";
import WysiwygInput from "beinformed/modules/FormInput/WysiwygInput";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";
import FormAssistant from "beinformed/modules/FormAssistant/FormAssistant";
import FormLabel from "beinformed/modules/FormLabel/FormLabel";
import type MemoAttributeModel from "beinformed/models/attributes/MemoAttributeModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type MemoAttributeProps = {
  attribute: MemoAttributeModel,
  className?: string,
  questionContentConfiguration?: ContentConfigurationElements,
  id: string,
  name: string,
  formLayout?: "vertical" | "horizontal",
  onChange: (attribute: MemoAttributeModel, value: string) => void,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render (Formatted) Memo attribute group
 */
const MemoAttribute = ({
  className,
  questionContentConfiguration,
  attribute,
  name,
  id,
  formLayout,
  onChange,
  onBlur,
  onFocus
}: MemoAttributeProps) => {
  const groupClass = classNames("form-group row", className, {
    "has-danger": attribute.inError(),
    memowidget: attribute.type === "memo"
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
        {attribute.formatted ? (
          <WysiwygInput
            name={name}
            id={id}
            value={attribute.inputvalue}
            inError={attribute.inError()}
            readOnly={attribute.readonly}
            placeholder={attribute.placeholder}
            layouthint={attribute.layouthint}
            onChange={inputvalue => onChange(attribute, inputvalue)}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        ) : (
          <TextareaInput
            name={name}
            id={id}
            value={attribute.inputvalue}
            inError={attribute.inError()}
            readOnly={attribute.readonly}
            placeholder={attribute.placeholder}
            layouthint={attribute.layouthint}
            onChange={inputvalue => onChange(attribute, inputvalue)}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        )}
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

export default MemoAttribute;
