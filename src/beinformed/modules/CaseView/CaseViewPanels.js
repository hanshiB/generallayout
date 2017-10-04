// @flow
import React from "react";
import classNames from "classnames";

import Panels from "beinformed/modules/Panel/Panels";
import NavigationTabs from "beinformed/modules/Navigation/NavigationTabs";
import NavigationStages from "beinformed/modules/Navigation/NavigationStages";
import {
  DAP_STAGES_EXECUTABLE,
  DAP_STAGES_PERFORMED
} from "beinformed/constants/LayoutHints";

import "./CaseViewPanels.scss";

import type CaseViewModel from "beinformed/models/caseview/CaseViewModel";

/**
 * Render caseview panel links in a tab list
 */
const CaseViewPanelsTabs = ({
  caseview,
  onClick
}: {
  caseview: CaseViewModel,
  onClick: Function
}) => {
  const activeLink = caseview.panelCollection.activePanel
    ? caseview.panelCollection.activePanel.selflink
    : null;

  if (caseview.isStagesView) {
    return (
      <NavigationStages
        items={caseview.links.getLinksByGroup("panel")}
        activeLink={activeLink}
        executableStages={caseview.attributeCollection.getChoiceAttributeByLayoutHint(
          DAP_STAGES_EXECUTABLE
        )}
        performedStages={caseview.attributeCollection.getChoiceAttributeByLayoutHint(
          DAP_STAGES_PERFORMED
        )}
        onClick={onClick}
      />
    );
  }

  return (
    <NavigationTabs
      className="caseview-panel-tabs"
      items={caseview.links.getLinksByGroup("panel")}
      activeLink={activeLink}
      onClick={onClick}
    />
  );
};

/**
 * Render Case view panels
 */
const CaseViewPanels = ({
  caseview,
  onPanelTabClick
}: {
  caseview: CaseViewModel,
  onPanelTabClick: Function
}) => {
  const renderPanelsAsTab =
    caseview.panelCollection.size <= 1 && caseview.links.size > 1;
  const activePanelLink = caseview.getActivePanelLink();
  const activePanelHref =
    activePanelLink === null ? null : activePanelLink.href;

  return (
    <div className="caseview-panels">
      {(caseview.isStagesView || renderPanelsAsTab) && (
        <CaseViewPanelsTabs caseview={caseview} onClick={onPanelTabClick} />
      )}
      <Panels
        panels={caseview.panelCollection}
        className={classNames({ "tab-pane": renderPanelsAsTab })}
        href={activePanelHref}
      />
    </div>
  );
};

export default CaseViewPanels;
