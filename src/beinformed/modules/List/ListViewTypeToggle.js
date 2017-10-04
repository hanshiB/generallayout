// @flow
import React from "react";

import { injectMessage } from "beinformed/modules/I18n/Message";
import Icon from "beinformed/modules/Icon/Icon";
import Toggle from "beinformed/modules/Toggle/Toggle";
import ToggleItem from "beinformed/modules/Toggle/ToggleItem";

type ListViewTypeToggleProps = {
  activeType: string,
  availableViews: {
    type: string,
    icon: string,
    label: string
  }[],
  listKey: string,
  message: messageFunctionType,
  onChange: (value: string) => void
};

/**
 * Render type that is active, used to render the correct child element
 */
const ListViewTypeToggle = ({
  activeType,
  availableViews,
  listKey,
  message,
  onChange
}: ListViewTypeToggleProps) => {
  if (Array.isArray(availableViews)) {
    return (
      <Toggle
        className="ml-1"
        ariaLabel={message("ListViewTypeToggle.AriaLabel", "List type toggler")}
      >
        {availableViews.map(view => (
          <ToggleItem
            key={`toggle-${listKey}-${view.type}`}
            name={`toggle-${listKey}-${view.label}`}
            value={view.type}
            isActive={activeType === view.type}
            ariaLabel={message(
              `ListViewTypeToggle.${view.type}ToggleLabel`,
              "Show as {VIEWTYPE}",
              { VIEWTYPE: view.label }
            )}
            onChange={onChange}
          >
            <Icon name={view.icon} />
          </ToggleItem>
        ))}
      </Toggle>
    );
  }

  return null;
};

export default injectMessage(ListViewTypeToggle);
