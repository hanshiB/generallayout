// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";

import FormModel from "beinformed/models/form/FormModel";

import { showFormNotification } from "beinformed/modules/Notification/redux/NotificationActions";
import { updateCaseView } from "beinformed/modules/CaseView/redux/CaseViewActions";
import { openPanelAction } from "beinformed/modules/Panel/redux/PanelActions";
import { reloadList } from "beinformed/modules/List/redux/ListActions";
import { redirect } from "beinformed/modules/Redirect/redux/RedirectActions";

import {
  NOTIFY,
  FORM_FINISH_RETURN,
  FORM_FINISH_RETURN_RELOAD_LIST
} from "beinformed/constants/LayoutHints";

import type FormObjectModel from "beinformed/models/form/FormObjectModel";

// CONSTANTS
export type receiveFormType = {
  type: "RECEIVE_FORM",
  payload: FormModel
};
export type formFinishedType = {
  type: "FORM_FINISHED"
};
export type cancelFormType = {
  type: "CANCEL_FORM"
};
export type previousFormType = {
  type: "RECEIVE_PREVIOUS_FORM",
  payload: FormModel
};
export type updateAttributeType = {
  type: "UPDATE_FORM_ATTRIBUTE",
  payload: FormModel
};

/**
 * Receive new form
 */
export const receiveForm = (form: FormModel): receiveFormType => ({
  type: "RECEIVE_FORM",
  payload: form
});

/**
 * Finish form indicator
 */
export const formFinished = (): formFinishedType => ({
  type: "FORM_FINISHED"
});

/**
 * Cancel a form
 */
export const cancelForm = (): cancelFormType => ({
  type: "CANCEL_FORM"
});

export const previousForm = (newForm: FormModel): previousFormType => ({
  type: "RECEIVE_PREVIOUS_FORM",
  payload: newForm
});

/**
 * Update attribute
 */
export const updateAttributeAction = (
  newForm: FormModel
): updateAttributeType => ({
  type: "UPDATE_FORM_ATTRIBUTE",
  payload: newForm
});

/**
 * Handles actions that need to be performed when a form successfully finishes,
 * like update of a caseview, notification messages, etc.
 */
export const handleFormFinish = (form: FormModel): ThunkAction => (
  dispatch,
  getState
) => {
  if (form.layouthint.has(NOTIFY)) {
    dispatch(showFormNotification(form));
  }

  dispatch(formFinished());

  const successRedirect = form.successRedirect;

  if (form.layouthint.has(FORM_FINISH_RETURN_RELOAD_LIST)) {
    dispatch(reloadList());
  } else if (successRedirect && !form.layouthint.has(FORM_FINISH_RETURN)) {
    if (
      getState().caseview &&
      getState().caseview.panelCollection.hasPanelByHref(successRedirect)
    ) {
      dispatch(updateCaseView());
      dispatch(openPanelAction(successRedirect));
    } else {
      // follow success redirect
      dispatch(redirect(successRedirect));
    }
  }
};

/**
 * Updates an old form model with a new form model
 */
const updateForm = (oldform: FormModel, newform: FormModel) => {
  // make copy of old form
  const updatedForm: FormModel = oldform.clone();

  // update new self link with old self link including action fields to keep the request parameters.
  // We'll need to decide how to get these request params from the services
  updatedForm.update(newform);
  updatedForm.links.update(oldform.selflink);

  return receiveForm(updatedForm);
};

const submitFormAction = (submitForm: FormModel) => {
  // when rendering an end result without other questions,
  // then this form submit must be commited
  if (submitForm.isResultOnly) {
    submitForm.commit = true;
  }

  return {
    [MODULARUI]: {
      href: submitForm.selfhref,
      method: "post",
      data: submitForm.formdata,
      targetModel: FormModel,
      successAction: receivedForm => {
        receivedForm.actiontype = submitForm.actiontype;

        if (receivedForm.isResultOnly && !submitForm.commit) {
          return updateForm(submitForm, receivedForm);
        }

        return receivedForm.isFinished
          ? handleFormFinish(receivedForm)
          : updateForm(submitForm, receivedForm);
      }
    }
  };
};

export const submitForm = (form: FormModel): ThunkAction => dispatch =>
  dispatch(submitFormAction(form));

/**
 * Update an attribute on a form
 */
export const updateFormAttribute = (
  form: FormModel,
  formObject: FormObjectModel,
  attribute: AttributeType,
  inputvalue: string
) => {
  const newForm = form.clone();

  newForm.missingObjects
    .get(formObject.key)
    .updateAttribute(attribute, inputvalue);

  return updateAttributeAction(newForm);
};

/**
 * Go back to previous object (back button on form)
 */
export const previousObject = (form: FormModel): ThunkAction => dispatch => {
  const newForm = form.clone();

  newForm.setPreviousObject();

  return dispatch(previousForm(newForm));
};
