// @flow
import React from "react";
import Helmet from "react-helmet";

import HTMLForm from "beinformed/modules/Form/HTMLForm";
import FormTitle from "beinformed/modules/Form/FormTitle";
import FormBody from "beinformed/modules/Form/FormBody";
import FormButtons from "beinformed/modules/Form/FormButtons";

import Modal from "beinformed/modules/Modal/Modal";
import ModalBody from "beinformed/modules/Modal/ModalBody";
import ModalFooter from "beinformed/modules/Modal/ModalFooter";
import ModalHeader from "beinformed/modules/Modal/ModalHeader";

import type FormModel from "beinformed/models/form/FormModel";

type ModalFormProps = {
  form: FormModel,
  formLayout: "vertical" | "horizontal",
  onAttributeChange: Function,
  onAttributeClick?: Function,
  onAttributeBlur?: Function,
  onAttributeFocus?: Function,
  onCancel: Function,
  onPreviousClick: Function,
  onSubmit: Function
};

/**
 * Render a form in a modal
 */
const ModalForm = ({
  form,
  formLayout,
  onAttributeChange,
  onAttributeClick,
  onAttributeBlur,
  onAttributeFocus,
  onCancel,
  onPreviousClick,
  onSubmit
}: ModalFormProps) => {
  let _modal = null;

  return (
    <Modal
      ref={c => {
        _modal = c;
      }}
      size="large"
    >
      <Helmet>
        <title>{form.label}</title>
      </Helmet>

      <ModalHeader showClose onClose={onCancel}>
        <FormTitle title={form.label} isModal />
      </ModalHeader>
      <HTMLForm
        name={form.key}
        onSubmit={() => {
          if (_modal) {
            _modal.scrollTop();
          }
          return onSubmit(form);
        }}
      >
        <ModalBody>
          <FormBody
            form={form}
            formLayout={formLayout}
            onAttributeChange={onAttributeChange}
            onAttributeClick={onAttributeClick}
            onAttributeBlur={onAttributeBlur}
            onAttributeFocus={onAttributeFocus}
          />
        </ModalBody>
        <ModalFooter>
          <FormButtons
            form={form}
            formLayout={formLayout}
            onCancel={onCancel}
            onPreviousClick={onPreviousClick}
          />
        </ModalFooter>
      </HTMLForm>
    </Modal>
  );
};

export default ModalForm;
