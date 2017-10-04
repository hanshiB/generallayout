// @flow
import React from "react";
import classNames from "classnames";

import NavigationItem from "beinformed/modules/Navigation/NavigationItem";

import "./NavigationTabs.scss";

import type LinkCollection from "beinformed/models/links/LinkCollection";
import type LinkModel from "beinformed/models/links/LinkModel";
import type Href from "beinformed/models/href/Href";

type NavigationTabsProps = {
  activeLink: LinkModel | null,
  className?: string,
  items: LinkCollection,
  onClick: (href: Href) => void
};

/**
 * Navigation tabs
 */
const NavigationTabs = ({
  activeLink,
  className,
  items,
  onClick
}: NavigationTabsProps) => {
  const tabsClass = classNames("nav nav-tabs", className);

  return (
    <ul className={tabsClass}>
      {items.links.map(link => (
        <NavigationItem
          key={link.key}
          link={link}
          onClick={onClick}
          isActive={activeLink !== null && link.isActive(activeLink)}
        />
      ))}
    </ul>
  );
};

export default NavigationTabs;
