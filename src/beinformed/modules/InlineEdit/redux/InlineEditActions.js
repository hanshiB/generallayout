// @flow
import { MODULARUI } from "beinformed/redux/modularuiMiddleware";

import {
  fetchList,
  requestList,
  receiveList
} from "beinformed/modules/List/redux/ListActions";
import {
  startProgress,
  finishProgress
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";

import type EditableListModel from "beinformed/models/list/EditableListModel";
import type EditableListItemModel from "beinformed/models/list/EditableListItemModel";

// ACTIONS

/**
 * Update attribute on a list
 */
export const updateEditableListAttribute = (
  list: EditableListModel,
  listitem: EditableListItemModel,
  attribute: AttributeType,
  inputvalue: string
): ThunkAction => dispatch => {
  dispatch(startProgress());

  const newList = list.clone();

  // update attribute
  const newListItem = listitem.clone();

  newListItem.errormessages = [];
  newListItem.updateEditableAttribute(attribute, inputvalue);

  newList.replaceListItem(listitem, newListItem);

  dispatch(receiveList(newList));

  return dispatch(finishProgress());
};

const createUpdateActionHref = (updateAction, listitem) => {
  updateAction.fields.forEach(field => {
    const listitemAttribute = listitem.getAttributeByKey(field.key);

    if (listitemAttribute) {
      updateAction.fieldCollection.replace(field, listitemAttribute);
    }
  });

  return updateAction.selfhref;
};

const getFormData = (form, listitem) => {
  form.missingObjects.all.forEach(formObject => {
    formObject.attributeCollection.all.forEach(attribute => {
      const listitemAttribute = listitem.getAttributeByKey(attribute.key);

      if (
        listitemAttribute &&
        attribute.inputvalue !== listitemAttribute.inputvalue
      ) {
        formObject.updateAttribute(
          listitemAttribute,
          listitemAttribute.inputvalue
        );
      }
    });
  });

  return form.formdata;
};

const handleUpdateResponse = formresponse => {
  if (formresponse.isFinished) {
    return fetchList(formresponse.successRedirect);
  }

  return void 0;
};

/**
 * Save editable list items by updating the inline edit action being used
 */
export const saveEditableListItem = (
  list: EditableListModel,
  listitem: EditableListItemModel
): ThunkAction => dispatch => {
  const updateAction = listitem.saveAction;

  if (!updateAction) {
    throw new Error("No update action available to save editable list item");
  }

  const updateActionHref = createUpdateActionHref(updateAction, listitem);

  const updateActionHrefWithCommit = updateAction.selfhref;
  updateActionHrefWithCommit.setParameter("commit", "true");

  return dispatch({
    [MODULARUI]: {
      href: updateActionHref,
      method: "post",
      data: {},
      successAction: form => ({
        [MODULARUI]: {
          href: updateActionHrefWithCommit,
          method: "post",
          data: getFormData(form, listitem),
          successAction: handleUpdateResponse
        }
      })
    }
  });
};

/**
 * Cancel the editing of a list item
 */
export const cancelEditableListItem = (
  list: EditableListModel
): ThunkAction => dispatch => dispatch(requestList(list.selfhref));
