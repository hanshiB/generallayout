// @flow
import React from "react";
import classNames from "classnames";

type CheckboxInputProps = {
  children?: any,
  className?: string,
  count?: number | null,
  disabled?: boolean,
  id: string,
  isChecked: boolean,
  label: string,
  name: string,
  readOnly?: boolean,
  value: string,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render a {@see https://facebook.github.io/react/docs/forms.html#uncontrolled-components|controlled} checkbox input with label
 * behind the checkbox
 */
const CheckboxInput = ({
  children,
  className,
  count,
  disabled,
  id,
  isChecked,
  label,
  name,
  readOnly,
  value = "",
  onBlur,
  onChange,
  onFocus
}: CheckboxInputProps) => {
  const inputClass = classNames("custom-control", "custom-checkbox", className);
  const htmlFor = `${id || name}-${value}`;

  return (
    <label
      className={inputClass}
      data-value={value}
      htmlFor={htmlFor}
      id={`${htmlFor}-label`}
    >
      <input
        className="custom-control-input"
        type="checkbox"
        id={htmlFor}
        name={name}
        value={value}
        disabled={disabled || readOnly}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        checked={isChecked}
        data-count={count}
        aria-labelledby={`${htmlFor}-label`}
      />
      <span className="custom-control-indicator" />
      {label}
      {children}
    </label>
  );
};

export default CheckboxInput;
