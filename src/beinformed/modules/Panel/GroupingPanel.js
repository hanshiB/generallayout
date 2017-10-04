// @flow
import React from "react";
import classNames from "classnames";

import FormattedText from "beinformed/modules/FormattedText/FormattedText";
import NavigationTabs from "beinformed/modules/Navigation/NavigationTabs";
import TaskGroupPanels from "beinformed/modules/TaskGroup/TaskGroupPanels";
import Panels from "beinformed/modules/Panel/Panels";
import Panel from "beinformed/modules/Panel/Panel";
import PanelBody from "beinformed/modules/Panel/PanelBody";

import "./GroupingPanel.scss";

import type GroupingPanelModel from "beinformed/models/panels/GroupingPanelModel";
import type Href from "beinformed/models/href/Href";

type GroupingPanelProps = {
  isStage?: boolean,
  panel: GroupingPanelModel,
  onPanelTabClick?: (panel: GroupingPanelModel, href: Href) => void
};

/**
 * Rendering of a GroupingPanel
 */
const GroupingPanel = ({
  panel,
  isStage,
  onPanelTabClick
}: GroupingPanelProps) => {
  // When more than one panel, and the caseview where this grouping panel belongs to is not a Stages View, then render tabs
  const renderPanelsAsTab = panel.links.size > 1 && !isStage;

  const mainPanelClass = classNames({
    "col-9 col-xl-10": panel.hasTasks(),
    "col-12": !panel.hasTasks()
  });

  const activeLink = panel.panelCollection.activePanel
    ? panel.panelCollection.activePanel.selflink
    : null;

  return (
    <Panel dataId={panel.key} className="groupingpanel">
      <PanelBody>
        {renderPanelsAsTab && <div className="panel-label">{panel.label}</div>}
        <div className="row">
          <div className={mainPanelClass}>
            {panel.introtext && (
              <FormattedText className="introtext" text={panel.introtext} />
            )}

            {renderPanelsAsTab && (
              <NavigationTabs
                className="grouping-panel-tabs"
                items={panel.links.getLinksByGroup("panel")}
                activeLink={activeLink}
                onClick={href => {
                  if (onPanelTabClick) {
                    onPanelTabClick(panel, href);
                  }
                }}
              />
            )}

            {panel.panelCollection.hasItems && (
              <Panels
                panels={panel.panelCollection}
                isTabs={renderPanelsAsTab}
              />
            )}
          </div>
          {panel.hasTasks && (
            <TaskGroupPanels
              className="col-3 col-xl-2"
              taskGroupPanels={panel.taskGroupCollection}
            />
          )}
        </div>
      </PanelBody>
    </Panel>
  );
};

export default GroupingPanel;
