// @flow
import React from "react";

import GroupingPanelModel from "beinformed/models/panels/GroupingPanelModel";
import GroupingPanelContainer from "beinformed/modules/Panel/GroupingPanelContainer";
import ListPanelContainer from "beinformed/modules/Panel/ListPanelContainer";
import type ListModel from "beinformed/models/list/ListModel";

type PanelRendererProps = {
  isActive?: boolean,
  isTab?: boolean,
  panel: ListModel | GroupingPanelModel
};

/**
 * Render correct panel based on instance of model
 */
const PanelRenderer = ({ isActive, isTab, panel }: PanelRendererProps) => {
  if (panel instanceof GroupingPanelModel) {
    return (
      <GroupingPanelContainer isActive={isActive} isTab={isTab} panel={panel} />
    );
  }

  return <ListPanelContainer isActive={isActive} isTab={isTab} list={panel} />;
};

export default PanelRenderer;
