// @flow
import React, { PureComponent } from "react";
// import classNames from "classnames";
import ActionCollection from "beinformed/models/actions/ActionCollection";
// import ActionContainer from "beinformed/modules/Action/ActionContainer";
import ActionList from "beinformed/modules/Action/ActionList";

import "./TaskGroupPanels.scss";

type ActionPanelsProps = {
  label?: string,
  actionCollection: ActionCollection
};

class ActionPanels extends PureComponent<ActionPanelsProps> {
  render() {
    const { label, actionCollection } = this.props;

    const visibleActions = actionCollection.filter(
      visibleAction =>
        visibleAction.layouthint.getByLayoutHint("HIDE_FROM_MENU") === null
    );

    return (
      <div className="taskgroup-panels">
        <div key={label} className="taskgroup" data-id="instruments">
          <h6>{label}</h6>
          <ActionList actions={visibleActions} />
        </div>
      </div>
    );
  }
}

export default ActionPanels;
