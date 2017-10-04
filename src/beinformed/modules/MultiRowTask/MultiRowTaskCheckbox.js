// @flow
import React from "react";

import { Message } from "beinformed/modules/I18n/Message";

import "./MultiRowTaskCheckbox.scss";

export type MultiRowTaskCheckboxProps = {
  isChecked: boolean,
  value: number | string,
  onChange: (value: number | string) => void
};

/**
 * Checkbox used for a multi row task list item
 */
const MultiRowTaskCheckbox = ({
  value,
  isChecked,
  onChange
}: MultiRowTaskCheckboxProps) => (
  <label
    className="multi-row-task-checkbox custom-control custom-checkbox"
    htmlFor={`multiselect-${value}`}
    id={`multiselect-${value}-label`}
  >
    <input
      type="checkbox"
      className="custom-control-input"
      id={`multiselect-${value}`}
      onChange={() => onChange(value)}
      checked={isChecked}
      value={value}
    />
    <span className="custom-control-indicator" />
    <span className="custom-control-description sr-only">
      <Message id="MultiRowTask.Checkbox" defaultMessage="Check item" />
    </span>
  </label>
);

export default MultiRowTaskCheckbox;
