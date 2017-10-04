// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";

import Href from "beinformed/models/href/Href";
import { KEYCODES } from "beinformed/constants/Constants";

type LinkProps = {
  ariaLabel?: string,
  children?: any,
  className?: string,
  dataId?: string | number,
  href: Href,
  isActive?: boolean,
  isDisabled?: boolean,
  isDownload?: boolean,
  isNavLink?: boolean,
  style?: Object,
  value?: string,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onClick?: (href: Href) => void,
  onEnter?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void,
  onLeave?: (e: SyntheticEvent<*>) => void
};

/**
 * HTML anchor link
 */
class Link extends PureComponent<LinkProps> {
  _link: any;

  static defaultProps = {
    href: new Href("#")
  };

  focus() {
    this._link.focus();
  }

  render() {
    const {
      href,
      className,
      value,
      isActive,
      isDisabled,
      isDownload,
      children,
      isNavLink,
      dataId,
      ariaLabel,
      onClick,
      onEnter,
      onLeave,
      ...htmlProps
    } = this.props;

    const linkClass = classNames(className, {
      active: isActive,
      "nav-link": isNavLink,
      disabled: isDisabled
    });

    return (
      <a
        ref={c => {
          this._link = c;
        }}
        {...htmlProps}
        href={href.absolutehref}
        data-value={value}
        data-id={dataId}
        disabled={isDisabled}
        download={isDownload}
        className={linkClass}
        aria-label={ariaLabel}
        onClick={e => {
          if (onClick) {
            e.preventDefault();

            return onClick(href);
          }

          return true;
        }}
        onKeyDown={e => {
          if (
            onClick &&
            (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE)
          ) {
            e.preventDefault();

            return onClick(href);
          }

          return true;
        }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {children}
      </a>
    );
  }
}

export default Link;
