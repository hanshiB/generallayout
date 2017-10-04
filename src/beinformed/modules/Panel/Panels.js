// @flow
import React from "react";
import classNames from "classnames";

import PanelRenderer from "beinformed/modules/Panel/PanelRenderer";
import type PanelCollection from "beinformed/models/panels/PanelCollection";

type PanelsProps = {
  className?: string,
  isTabs?: boolean,
  panels: PanelCollection
};

/**
 * Render one or more panels from a panel collection
 */
const Panels = ({ className, isTabs, panels }: PanelsProps) => {
  const panelsClass = classNames("panels", className, {
    "tab-content": isTabs
  });

  return (
    <div className={panelsClass}>
      {panels.all.map(panel => (
        <PanelRenderer
          key={panel.key}
          isTab={isTabs}
          isActive={
            panels.activePanel !== null && panel.key === panels.activePanel.key
          }
          panel={panel}
        />
      ))}
    </div>
  );
};

export default Panels;
