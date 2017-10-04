// @flow
import { connect } from "react-redux";

import {
  updateFormAttribute,
  //  updateFormAttributeAndSubmit,
  cancelForm,
  submitForm,
  previousObject
} from "beinformed/modules/Form/redux/FormActions";
import Form from "beinformed/modules/Form/Form";

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps) => ({
  form: state.form,
  fullPageForms: ownProps.fullPageForms || state.application.fullPageForms,
  formLayout: ownProps.formLayout || "vertical"
});

export default connect(mapStateToProps, {
  onAttributeChange: updateFormAttribute,
  //  onAttributeClick: updateFormAttributeAndSubmit,
  onCancel: cancelForm,
  onSubmit: submitForm,
  onPreviousClick: previousObject
})(Form);
