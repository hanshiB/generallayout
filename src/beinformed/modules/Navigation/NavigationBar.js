// @flow
import React from "react";
import classNames from "classnames";

type NavigationBarProps = {
  children?: any,
  className?: string,
  id: string
};

/**
 * Navigation bar
 */
const NavigationBar = ({ children, className, id }: NavigationBarProps) => {
  const navbarClass = classNames("nav", className);

  return (
    <ul id={id} className={navbarClass}>
      {children}
    </ul>
  );
};

export default NavigationBar;
