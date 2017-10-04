// @flow
import React from "react";
import classNames from "classnames";

import NavigationItem from "beinformed/modules/Navigation/NavigationItem";
import type LinkCollection from "beinformed/models/links/LinkCollection";
import type LinkModel from "beinformed/models/links/LinkModel";

type NavigationProps = {
  activeLink: LinkModel,
  className: string,
  items: LinkCollection,
  onClick: (link: LinkModel) => void
};

/**
 * Navigation
 */
const Navigation = ({
  activeLink,
  className,
  items,
  onClick
}: NavigationProps) => {
  const navbarClass = classNames("nav", className);

  return (
    <ul className={navbarClass}>
      {items.links.map((link, idx) => (
        <NavigationItem
          key={`${link.key}-${idx}` || idx}
          link={link}
          onClick={() => onClick(link)}
          isActive={link.isActive(activeLink)}
        />
      ))}
    </ul>
  );
};

export default Navigation;
