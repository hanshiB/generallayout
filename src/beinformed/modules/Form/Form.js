// @flow
import React from "react";

import FullPageForm from "beinformed/modules/Form/FullPageForm";
import ModalForm from "beinformed/modules/Form/ModalForm";
import type FormModel from "beinformed/models/form/FormModel";

type FormProps = {
  form: FormModel,
  fullPageForms: boolean,
  formLayout?: "vertical" | "horizontal",
  message: messageFunctionType,
  onAttributeChange: Function,
  onAttributeBlur?: Function,
  onAttributeClick?: Function,
  onAttributeFocus?: Function,
  onCancel: Function,
  onPreviousClick: Function,
  onSubmit: Function
};

/**
 * Render a form in a modal
 */
const Form = (props: FormProps) =>
  props.fullPageForms ? <FullPageForm {...props} /> : <ModalForm {...props} />;

export default Form;
