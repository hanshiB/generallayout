// @flow
import React, { Component } from "react";
import classNames from "classnames";

import NumberAttributeModel from "beinformed/models/attributes/NumberAttributeModel";
import NumberAttribute from "beinformed/modules/FormAttribute/NumberAttribute";
import DatetimeAttribute from "beinformed/modules/FormAttribute/DatetimeAttribute";
import FormAssistant from "beinformed/modules/FormAssistant/FormAssistant";
import FormLabel from "beinformed/modules/FormLabel/FormLabel";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
import type CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";

type RangeAttributeProps = {
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
 * Render range form group
 */
class RangeAttribute extends Component<RangeAttributeProps> {
  renderChildAttribute(
    type: "begin" | "end",
    childAttribute: RangeChildAttributeType
  ) {
    const childClass = classNames(`range-${type}`, {
      "has-danger": childAttribute.inError()
    });

    const name =
      (this.props.namePrefix || "") + childAttribute.contributions.name;

    if (childAttribute instanceof NumberAttributeModel) {
      return (
        <NumberAttribute
          className={childClass}
          questionContentConfiguration={this.props.questionContentConfiguration}
          attribute={childAttribute}
          isFilter={this.props.isFilter}
          name={name}
          id={name}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        />
      );
    }

    return (
      <DatetimeAttribute
        className={childClass}
        questionContentConfiguration={this.props.questionContentConfiguration}
        attribute={childAttribute}
        isFilter={this.props.isFilter}
        name={name}
        id={name}
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

    if (attribute.children.length === 0) {
      return <div>rangefilter</div>;
    }

    const groupClass = classNames("form-group row", className, {
      "has-danger": attribute.inError(),
      rangewidget: !className || !className.includes("widget")
    });

    const groupId =
      id === namePrefix + attribute.start.name ? `${id}-widget` : id;

    return (
      <div className={groupClass} data-name={name} id={groupId}>
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
          <div className="range">
            {this.renderChildAttribute("begin", attribute.start)}
            {this.renderChildAttribute("end", attribute.end)}
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

export default RangeAttribute;
