// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";

import { KEYCODES } from "beinformed/constants/Constants";

import Link from "beinformed/modules/Link/Link";
import type Href from "beinformed/models/href/Href";

type DropdownLinkProp = {
  ariaLabel?: string,
  children?: any,
  className?: string,
  href: Href,
  id?: string,
  value?: string,
  onClick: (href: Href) => void,
  onKeyUp?: Function
};

/**
 * Render dropdown item
 */
class DropdownLink extends PureComponent<DropdownLinkProp> {
  _link: any;

  focus() {
    this._link.focus();
  }

  render() {
    const {
      ariaLabel,
      children,
      className,
      href,
      id,
      value,
      onClick,
      onKeyUp
    } = this.props;

    const dropdownClass = classNames("dropdown-item", className);

    return (
      <Link
        ref={c => {
          this._link = c;
        }}
        ariaLabel={ariaLabel}
        className={dropdownClass}
        dataId={id}
        href={href}
        value={value}
        onClick={onClick}
        onKeyUp={e => {
          if ([KEYCODES.SPACE, KEYCODES.ENTER].includes(e.keyCode)) {
            e.preventDefault();

            return onClick(e);
          }

          return onKeyUp ? onKeyUp(e) : true;
        }}
        isNavLink
      >
        {children}
      </Link>
    );
  }
}

export default DropdownLink;
