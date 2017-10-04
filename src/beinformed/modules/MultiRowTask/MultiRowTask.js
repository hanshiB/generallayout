// @flow
import React from "react";

import ButtonGroup from "beinformed/modules/Button/ButtonGroup";
import Button from "beinformed/modules/Button/Button";
import { Message } from "beinformed/modules/I18n/Message";
import type ActionCollection from "beinformed/models/actions/ActionCollection";
import type ActionModel from "beinformed/models/actions/ActionModel";

export type MultiRowTaskProps = {
  actions: ActionCollection,
  selectedItemIds: number[],
  onClick: (action: ActionModel, selectedItemIds: number[]) => void
};

/**
 * Multi row tasks
 */
const MultiRowTask = ({
  selectedItemIds,
  actions,
  onClick
}: MultiRowTaskProps) => (
  <ButtonGroup>
    {actions.all.map(action => (
      <Button
        key={action.name}
        dataId={action.name}
        name={action.name}
        disabled={selectedItemIds.length === 0}
        onClick={() => onClick(action, selectedItemIds)}
      >
        <Message id={`Action.${action.name}`} defaultMessage={action.label} />
      </Button>
    ))}
  </ButtonGroup>
);

export default MultiRowTask;
