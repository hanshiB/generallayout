// @flow
import React from "react";
import Helmet from "react-helmet";

import HTMLForm from "beinformed/modules/Form/HTMLForm";

import FormTitle from "beinformed/modules/Form/FormTitle";
import FormBody from "beinformed/modules/Form/FormBody";
import FormButtons from "beinformed/modules/Form/FormButtons";

import "./FullPageForm.scss";

import type FormModel from "beinformed/models/form/FormModel";

type FullPageFormProps = {
  form: FormModel,
  formLayout?: "vertical" | "horizontal",
  onAttributeChange: Function,
  onAttributeBlur?: Function,
  onAttributeFocus?: Function,
  onCancel: () => void,
  onPreviousClick: (form: FormModel) => void,
  onSubmit: Function
};

const FullPageForm = ({
  form,
  formLayout,
  onAttributeChange,
  onAttributeBlur,
  onAttributeFocus,
  onCancel,
  onPreviousClick,
  onSubmit
}: FullPageFormProps) => (
  <div className="fullpage-form container">
    <FormTitle title={form.label} />

    <HTMLForm name={form.key} onSubmit={() => onSubmit(form)}>
      <Helmet>
        <title>{form.label}</title>
      </Helmet>

      <FormBody
        form={form}
        formLayout={formLayout}
        onAttributeChange={onAttributeChange}
        onAttributeBlur={onAttributeBlur}
        onAttributeFocus={onAttributeFocus}
      />

      <FormButtons
        form={form}
        formLayout={formLayout}
        onCancel={onCancel}
        onPreviousClick={onPreviousClick}
      />
    </HTMLForm>
  </div>
);

export default FullPageForm;
