// @flow
import React from "react";

import { Message } from "beinformed/modules/I18n/Message";

import "./MultiRowTaskCheckbox.scss";

type MultiRowTaskAllCheckboxProps = {
  isChecked: boolean,
  values: number[],
  onChange: (values: number[]) => void
};

/**
 * Checkbox used for a multi row task list item
 */
const MultiRowTaskAllCheckbox = ({
  values,
  isChecked,
  onChange
}: MultiRowTaskAllCheckboxProps) => (
  <label
    className="multi-row-task-checkbox custom-control custom-checkbox"
    htmlFor="multiselect-all"
    id="multiselect-all-label"
  >
    <input
      type="checkbox"
      className="custom-control-input"
      id="multiselect-all"
      onChange={() => onChange(isChecked ? [] : values)}
      checked={isChecked}
    />
    <span className="custom-control-indicator" />
    <span className="custom-control-description sr-only">
      <Message id="MultiRowTask.AllCheckbox" defaultMessage="Check all items" />
    </span>
  </label>
);

export default MultiRowTaskAllCheckbox;
