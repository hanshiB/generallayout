// @flow
import React from "react";

import type LinkCollection from "beinformed/models/links/LinkCollection";
import type LinkModel from "beinformed/models/links/LinkModel";
import NavigationBar from "beinformed/modules/Navigation/NavigationBar";
import NavigationItem from "beinformed/modules/Navigation/NavigationItem";

type MainMenuProps = {
  activeLink: LinkModel,
  className?: string,
  id: string,
  items: LinkCollection,
  onClick: (link: LinkModel) => void
};

/**
 * Navigation bar
 */
const MainMenu = ({
  activeLink,
  className,
  id,
  items,
  onClick
}: MainMenuProps) => (
  <NavigationBar id={id} className={className}>
    {items.all.map(link => (
      <NavigationItem
        key={link.key}
        link={link}
        onClick={() => onClick(link)}
        isActive={link.isActive(activeLink)}
      />
    ))}
  </NavigationBar>
);

export default MainMenu;
