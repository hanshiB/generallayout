// @flow
import React, { Component } from "react";

import FormObjects from "beinformed/modules/FormObjects/FormObjects";
import FormResults from "beinformed/modules/FormResults/FormResults";
import FormErrorMessages from "beinformed/modules/FormError/FormErrorMessages";

import type FormModel from "beinformed/models/form/FormModel";

type FormBodyProps = {
  form: FormModel,
  formLayout?: "vertical" | "horizontal",
  onAttributeChange: Function,
  onAttributeBlur?: Function,
  onAttributeClick?: Function,
  onAttributeFocus?: Function
};

type FormBodyState = {
  showFormErrors: boolean
};

/**
 * Render form objects of a form
 */
class FormBody extends Component<FormBodyProps, FormBodyState> {
  constructor(props: FormBodyProps) {
    super(props);

    this.state = {
      showFormErrors: true
    };
  }

  handleErrorDismiss = () => {
    this.setState({
      showFormErrors: false
    });
  };

  render() {
    const {
      form,
      formLayout,
      onAttributeChange,
      onAttributeBlur,
      onAttributeClick,
      onAttributeFocus
    } = this.props;

    return (
      <div className="form-body">
        {this.state.showFormErrors &&
          form.hasServerErrors() && (
            <FormErrorMessages
              form={form}
              onDismiss={this.handleErrorDismiss}
            />
          )}

        {form.endResultObjects.hasItems && (
          <FormResults
            id={`${form.key}-results`}
            results={form.endResultObjects}
          />
        )}

        {form.missingObjects.hasItems && (
          <FormObjects
            className="form-objects-missing"
            objects={form.missingObjects}
            id={form.key}
            formLayout={formLayout}
            onAttributeChange={(...args) => onAttributeChange(form, ...args)}
            onAttributeBlur={(...args) =>
              onAttributeBlur ? onAttributeBlur(form, ...args) : void 0}
            onAttributeClick={(...args) =>
              onAttributeClick ? onAttributeClick(form, ...args) : void 0}
            onAttributeFocus={(...args) =>
              onAttributeFocus ? onAttributeFocus(form, ...args) : void 0}
          />
        )}
      </div>
    );
  }
}

export default FormBody;
