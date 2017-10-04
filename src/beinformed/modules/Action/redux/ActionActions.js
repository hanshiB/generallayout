// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";
import {
  receiveForm,
  handleFormFinish,
  submitForm
} from "beinformed/modules/Form/redux/FormActions";

import FormModel from "beinformed/models/form/FormModel";
import type ActionModel from "beinformed/models/actions/ActionModel";

/**
 * Start an action
 */
export const fetchAction = (action: ActionModel) => ({
  [MODULARUI]: {
    href: action.selfhref,
    method: "POST",
    targetModel: FormModel,
    successAction: model => {
      const form = model.clone();
      form.actiontype = action.type;

      form.parameters = action.selfhref.parameters;

      if (form.isComplete && !form.hasResultConfiguration) {
        return submitForm(form);
      }

      if (form.isFinished) {
        return handleFormFinish(form);
      }

      return receiveForm(form);
    }
  }
});

export const startAction = (action: ActionModel): ThunkAction => dispatch =>
  dispatch(fetchAction(action));
