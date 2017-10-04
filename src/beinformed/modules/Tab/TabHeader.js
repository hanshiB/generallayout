// @flow
import React from "react";

import TabComponentMenuContainer from "beinformed/modules/TabComponent/TabComponentMenuContainer";
import QuickSearchContainer from "beinformed/modules/CaseSearch/QuickSearchContainer";

/**
 * Render the application header
 */
const TabHeader = () => (
  <div className="tab-header row bg-primary">
    <div className="col-md-3 py-1">
      <TabComponentMenuContainer />
    </div>
    <div className="col-md-9 py-1">
      <QuickSearchContainer />
    </div>
  </div>
);

export default TabHeader;
