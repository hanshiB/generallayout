// @flow
import React from "react";
import classNames from "classnames";

import Link from "beinformed/modules/Link/Link";
import Icon from "beinformed/modules/Icon/Icon";

import "./NavigationItem.scss";

import type LinkModel from "beinformed/models/links/LinkModel";
import type Href from "beinformed/models/href/Href";

type NavigationItemProps = {
  className?: string,
  isActive: boolean | null,
  link: LinkModel,
  onClick: (href: Href) => void
};

/**
 * Navigation item
 */
const NavigationItem = ({
  className,
  isActive,
  link,
  onClick
}: NavigationItemProps) => {
  const itemClass = classNames("nav-item", className);
  const linkClass = classNames({
    active: isActive
  });

  return (
    <li className={itemClass}>
      <Link
        className={linkClass}
        dataId={link.key}
        href={link.href}
        onClick={onClick}
        isNavLink
      >
        {link.icon && <Icon name={link.icon} />}
        {link.label}
      </Link>
    </li>
  );
};

export default NavigationItem;
