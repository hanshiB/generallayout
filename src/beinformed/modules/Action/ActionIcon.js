// @flow
import React from "react";

import Icon from "beinformed/modules/Icon/Icon";

type IconTypes =
  | "form"
  | "create"
  | "update"
  | "delete"
  | "general"
  | "contextaware"
  | string;

type ActionIconType = {
  icon: string,
  isCompleteStage: boolean,
  type: IconTypes
};

/**
 * Render correct icon for action
 */
const ActionIcon = ({ isCompleteStage, icon, type }: ActionIconType) => {
  if (isCompleteStage) {
    return <Icon name="check-circle-o" textAfter />;
  }

  if (icon) {
    return <Icon name={icon} textAfter />;
  }

  if (type === "create") {
    return <Icon name="plus" textAfter />;
  }

  if (type === "update") {
    return <Icon name="pencil" textAfter />;
  }

  if (type === "delete") {
    return <Icon name="trash-o" textAfter />;
  }

  return <Icon name="cog" textAfter />;
};

export default ActionIcon;
