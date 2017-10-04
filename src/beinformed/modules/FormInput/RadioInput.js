// @flow
import React from "react";
import classNames from "classnames";

type RadioInputProps = {
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
 * Render radio input
 */
const RadioInput = ({
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
}: RadioInputProps) => {
  const inputClass = classNames("custom-control", "custom-radio", className);
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
        id={htmlFor}
        type="radio"
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        // onClick={e => (onClick ? onClick(e.target.value) : void 0)}
        onBlur={onBlur}
        onFocus={onFocus}
        checked={isChecked}
        data-count={count}
        disabled={disabled || readOnly}
        aria-labelledby={`${htmlFor}-label`}
      />
      <span className="custom-control-indicator" />
      {label}
      {children}
    </label>
  );
};

export default RadioInput;
