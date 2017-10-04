// @flow
import React from "react";
import classNames from "classnames";

import Dropdown from "beinformed/modules/Dropdown/Dropdown";
import DropdownButton from "beinformed/modules/Dropdown/DropdownButton";
import DropdownChildren from "beinformed/modules/Dropdown/DropdownChildren";
import DropdownLink from "beinformed/modules/Dropdown/DropdownLink";
import { injectMessage } from "beinformed/modules/I18n/Message";

import type LinkModel from "beinformed/models/links/LinkModel";
import type Href from "beinformed/models/href/Href";

type TabComponentMenuProps = {
  activeLink: LinkModel,
  items: LinkModel[],
  message: messageFunctionType,
  onItemClick: (href: Href) => void
};

/**
 * Tab component chooser
 */
const TabComponentMenu = ({
  items,
  activeLink,
  message,
  onItemClick
}: TabComponentMenuProps) => {
  const components = [];

  components.push(
    ...items.filter(component => component.group === "component")
  );
  components.push(...items.filter(component => component.group === "search"));

  const activeItem = components.find(link => link.isActive(activeLink));

  /**
   * Add divider css class between components and search
   */
  const itemClass = (idx, component) =>
    classNames({
      "group-divider": idx > 0 && components[idx - 1].group !== component.group
    });

  return (
    <Dropdown className="component-chooser">
      <DropdownButton className="tab-title">
        {activeItem
          ? activeItem.label
          : message(
              "ComponentChooser.Menu.SelectComponent",
              "Select component"
            )}
      </DropdownButton>
      <DropdownChildren>
        {components.map((component, idx) => (
          <DropdownLink
            key={`${component.key}-${idx}`}
            className={itemClass(idx, component)}
            id={component.key}
            href={component.href}
            onClick={onItemClick}
          >
            {component.label}
          </DropdownLink>
        ))}
      </DropdownChildren>
    </Dropdown>
  );
};

export default injectMessage(TabComponentMenu);
