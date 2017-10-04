// @flow
import React from "react";

import ActionContainer from "beinformed/modules/Action/ActionContainer";
import type ActionModel from "beinformed/models/actions/ActionModel";

type ActionListType = {
  actions: ActionModel[]
};

/**
 * Render a list of actions
 */
const ActionList = ({ actions }: ActionListType) => (
  <ul className="list-unstyled">
    {actions.map(action => (
      <li key={action.key}>
        <ActionContainer action={action} />
      </li>
    ))}
  </ul>
);

export default ActionList;
