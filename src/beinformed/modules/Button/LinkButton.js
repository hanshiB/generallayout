// @flow
import React from "react";
import classNames from "classnames";

import type Href from "beinformed/models/href/Href";
import Link from "beinformed/modules/Link/Link";

type LinkButtonType = {
  ariaLabel?: string,
  buttonStyle?:
    | "danger"
    | "info"
    | "link"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "light"
    | "dark",
  children?: any,
  className?: string,
  disabled?: boolean,
  href: Href,
  name?: string,
  size?: "small" | "large" | "default",
  value?: string,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onClick?: (href: Href) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render a link as a button
 */
const LinkButton = ({
  children,
  buttonStyle = "light",
  ariaLabel,
  className,
  size,
  ...htmlProps
}: LinkButtonType) => {
  const buttonClass = classNames("btn", `btn-${buttonStyle}`, className, {
    "btn-sm": size === "small",
    "btn-lg": size === "large"
  });

  return (
    <Link {...htmlProps} className={buttonClass} aria-label={ariaLabel}>
      {children}
    </Link>
  );
};

export default LinkButton;
