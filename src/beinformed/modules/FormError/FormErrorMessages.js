// @flow
import React from "react";

import FormErrorTree from "beinformed/modules/FormError/FormErrorTree";
import type FormModel from "beinformed/models/form/FormModel";
import type FormObjectModel from "beinformed/models/form/FormObjectModel";

type FormErrorMessagesProps = {
  form: FormModel,
  onAttributeClick?: Function,
  onDismiss?: Function,
  onObjectClick?: (object: FormObjectModel) => void
};

/**
 * Render Form errors
 */
const FormErrorMessages = ({
  form,
  onDismiss,
  onAttributeClick,
  onObjectClick
}: FormErrorMessagesProps) => (
  <div
    className="form-errormessages alert alert-danger alert-dismissible"
    role="alert"
  >
    {typeof onDismiss === "function" && (
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={onDismiss}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    )}

    <FormErrorTree
      form={form}
      onAttributeClick={onAttributeClick}
      onObjectClick={onObjectClick}
    />
  </div>
);

export default FormErrorMessages;
