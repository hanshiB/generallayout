// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { Message } from "beinformed/modules/I18n/Message";
import Icon from "beinformed/modules/Icon/Icon";
import type ErrorCollection from "beinformed/models/error/ErrorCollection";
import type ErrorModel from "beinformed/models/error/ErrorModel";
import type ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import type ConstraintModel from "beinformed/models/constraints/ConstraintModel";

type FormAssistantProps = {
  assistantMessage?: string | null,
  constraints?: ConstraintCollection,
  errors?: ErrorCollection,
  value?: string
};

/**
 * Render assistant messages
 */
class FormAssistant extends Component<FormAssistantProps> {
  getIcon(isError: boolean) {
    if (isError) {
      return "exclamation-circle";
    } else if (this.props.value && this.props.value !== "" && !isError) {
      return "check-circle";
    }

    return "";
  }

  /**
   * Single constraint message
   */
  constraintMessage(constraint: ConstraintModel, idx: number) {
    const isError =
      !this.props.value || this.props.value === ""
        ? false
        : !constraint.validate(this.props.value);

    const isAssistant = !constraint.hasValidation();

    const cssClass = classNames({
      "constraint-message": constraint.hasValidation(),
      "assistant-message": isAssistant,
      "text-danger": isError,
      "text-success": this.props.value && this.props.value !== "" && !isError
    });

    const icon = this.getIcon(isError);

    if (isAssistant || isError) {
      return (
        <li key={idx} className={cssClass}>
          {icon !== "" && <Icon name={icon} textAfter />}
          <Message
            id={constraint.id}
            defaultMessage={constraint.id}
            data={constraint.parameters}
          />
        </li>
      );
    }

    return null;
  }

  errorMessage(error: ErrorModel, idx: number) {
    return (
      <li key={`error-${idx}`} className="text-danger">
        <Icon name="exclamation-circle" textAfter />
        <Message
          id={error.id}
          defaultMessage={error.id}
          data={error.parameters}
        />
      </li>
    );
  }

  render() {
    return (
      <ul className="text-muted mb-0 small list-unstyled input-assistant">
        {this.props.assistantMessage && (
          <li className="assistant-message">{this.props.assistantMessage}</li>
        )}
        {this.props.errors &&
          this.props.errors.serverErrors.map((error, i) =>
            this.errorMessage(error, i)
          )}
        {this.props.constraints &&
          this.props.constraints.all.map((constraint, i) =>
            this.constraintMessage(constraint, i)
          )}
      </ul>
    );
  }
}

export default FormAssistant;
