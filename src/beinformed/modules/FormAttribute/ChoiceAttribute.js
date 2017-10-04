// @flow
import React from "react";
import classNames from "classnames";

import ChoiceInput from "beinformed/modules/FormInput/ChoiceInput";
import FormAssistant from "beinformed/modules/FormAssistant/FormAssistant";
import FormLabel from "beinformed/modules/FormLabel/FormLabel";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";

import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

import { POPUP } from "beinformed/constants/LayoutHints";

import type ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";

type ChoiceAttributeProps = {
  attribute: ChoiceAttributeModel,
  className?: string,
  questionContentConfiguration?: ContentConfigurationElements,
  optionContentConfiguration?: ContentConfigurationElements,
  id: string,
  name: string,
  stacked?: boolean,
  stackedItemCount?: number,
  formLayout?: "vertical" | "horizontal",
  onChange: (attribute: ChoiceAttributeModel, value: string) => void,
  onClick?: (attribute: ChoiceAttributeModel, value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render choice attribute form group
 */
const ChoiceAttribute = ({
  attribute,
  className,
  questionContentConfiguration,
  optionContentConfiguration,
  id,
  name,
  stacked,
  stackedItemCount,
  formLayout,
  onClick,
  onChange,
  onFocus
}: ChoiceAttributeProps) => {
  const groupClass = classNames(className, "choicewidget form-group", {
    "has-danger": attribute.inError(),
    clearfix: stacked,
    HORIZONTAL_FORM_ATTRIBUTE_CLASS: formLayout === "horizontal"
  });

  return (
    <fieldset className={groupClass} data-name={name}>
      <legend className="form-legend sr-only">{attribute.label}</legend>
      <div className="row">
        <FormLabel
          htmlFor={id || name}
          defaultLabel={attribute.label}
          concept={attribute.concept}
          content={attribute.content}
          contentConfiguration={questionContentConfiguration}
          isMandatory={attribute.mandatory}
          formLayout={formLayout}
        />
        {questionContentConfiguration &&
          formLayout !== "horizontal" &&
          (attribute.choicetype === "checkbox" ||
            attribute.choicetype === "radiobutton") && (
            <div className="col-12">
              <FormContentRenderer
                concept={attribute.concept}
                contentConfiguration={questionContentConfiguration.excludeLayoutHints(
                  [POPUP]
                )}
              />
            </div>
          )}

        <div className="col">
          <ChoiceInput
            stacked={stacked}
            stackedItemCount={stackedItemCount}
            name={name}
            id={id || name}
            label={attribute.label}
            type={attribute.choicetype}
            options={attribute.options.all}
            isTree={attribute.isTree}
            placeholder={attribute.placeholder}
            readOnly={attribute.readonly}
            optionContentConfiguration={
              optionContentConfiguration || attribute.contentConfiguration
            }
            layouthint={attribute.layouthint}
            onChange={inputvalue => onChange(attribute, inputvalue)}
            onClick={inputvalue =>
              onClick ? onClick(attribute, inputvalue) : void 0}
            onFocus={onFocus}
            formLayout={formLayout}
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
          {questionContentConfiguration &&
            (formLayout === "horizontal" ||
              (attribute.choicetype !== "checkbox" &&
                attribute.choicetype !== "radiobutton")) && (
              <FormContentRenderer
                concept={attribute.concept}
                contentConfiguration={questionContentConfiguration.excludeLayoutHints(
                  [POPUP]
                )}
              />
            )}
        </div>
      </div>
    </fieldset>
  );
};

export default ChoiceAttribute;
