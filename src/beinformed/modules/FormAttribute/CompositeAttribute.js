// @flow
import React, { Component } from "react";
import classNames from "classnames";

import FormAttribute from "beinformed/modules/FormAttribute/FormAttribute";

import FormAssistant from "beinformed/modules/FormAssistant/FormAssistant";
import FormLabel from "beinformed/modules/FormLabel/FormLabel";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
import type CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";

type CompositeAttributeProps = {
  attribute: CompositeAttributeModel,
  className?: string,
  questionContentConfiguration?: ContentConfigurationElements,
  id: string,
  isFilter?: boolean,
  name: string,
  namePrefix?: string,
  formLayout?: "vertical" | "horizontal",
  onChange: (attribute: RangeChildAttributeType, value: string) => void,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render composite attribute
 */
class CompositeAttribute extends Component<CompositeAttributeProps> {
  renderChildAttribute(childAttribute: AttributeType) {
    const childClass = classNames({
      "has-danger": childAttribute.inError()
    });

    const name = (this.props.namePrefix || "") + childAttribute.name;

    return (
      <FormAttribute
        key={name}
        className={childClass}
        questionContentConfiguration={this.props.questionContentConfiguration}
        attribute={childAttribute}
        isFilter={this.props.isFilter}
        name={name}
        id={name}
        formLayout={this.props.formLayout}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
      />
    );
  }

  render() {
    const {
      attribute,
      className,
      namePrefix = "",
      name,
      id,
      questionContentConfiguration,
      formLayout
    } = this.props;

    const dataName = (namePrefix || "") + name;

    const groupClass = classNames("form-group row", className, {
      "has-danger": attribute.inError(),
      compositewidget: !className || !className.includes("widget")
    });

    return (
      <div className={groupClass} data-name={dataName} id={id}>
        <FormLabel
          htmlFor={`range-${id || name}`}
          defaultLabel={attribute.label}
          concept={attribute.concept}
          content={attribute.content}
          contentConfiguration={questionContentConfiguration}
          isMandatory={attribute.mandatory}
          formLayout={formLayout}
        />
        <div className="col">
          <div className="children">
            {attribute.children.map(child => this.renderChildAttribute(child))}
          </div>
          {(attribute.assistantMessage ||
            attribute.constraintCollection.hasItems ||
            attribute.errorCollection.hasItems) && (
            <FormAssistant
              constraints={attribute.constraintCollection}
              errors={attribute.errorCollection}
              assistantMessage={attribute.assistantMessage}
            />
          )}
          <FormContentRenderer
            concept={attribute.concept}
            contentConfiguration={questionContentConfiguration}
          />
        </div>
      </div>
    );
  }
}

export default CompositeAttribute;
