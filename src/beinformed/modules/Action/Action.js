// @flow
import React from "react";
import classNames from "classnames";

import Link from "beinformed/modules/Link/Link";
import ActionIcon from "beinformed/modules/Action/ActionIcon";
import { DAP_COMPLETE_STAGE } from "beinformed/constants/LayoutHints";
import type ActionModel from "beinformed/models/actions/ActionModel";

export type ActionProps = {
  action: ActionModel,
  isButton?: boolean,
  isPrimary?: boolean,
  isDropdown?: boolean,
  onActionClick: (action: ActionModel) => void
};

/**
 * Create Action link with correct icon
 */
const Action = ({
  action,
  isButton,
  isPrimary,
  isDropdown,
  onActionClick
}: ActionProps) => {
  const linkClass = classNames("btn-task", {
    btn: isButton,
    "btn-light":
      isButton && !isPrimary && !action.layouthint.has(DAP_COMPLETE_STAGE),
    "btn-primary":
      isButton && (isPrimary || action.layouthint.has(DAP_COMPLETE_STAGE)),
    "dropdown-item": isDropdown
  });

  return (
    <Link
      onClick={() => onActionClick(action)}
      dataId={action.name}
      href={action.selfhref}
      className={linkClass}
    >
      <ActionIcon
        isCompleteStage={action.layouthint.has(DAP_COMPLETE_STAGE)}
        icon={action.icon}
        type={action.type}
      />
      {action.label}
    </Link>
  );
};

export default Action;
