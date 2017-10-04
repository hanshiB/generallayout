// @flow
import React from "react";
import classNames from "classnames";

type AddOnButtonType = {
  children?: any,
  className?: string,
  type?: string,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onClick?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<*>) => void
};

/**
 * Render add on button for fields
 */
const AddOnButton = ({
  className,
  children,
  type = "submit",
  onBlur,
  onClick,
  onFocus,
  onKeyDown
}: AddOnButtonType) => {
  const spanClass = classNames("input-group-btn", className);

  return (
    <span className={spanClass}>
      <button
        className="btn btn-light"
        type={type}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
      >
        {children}
      </button>
    </span>
  );
};

export default AddOnButton;
