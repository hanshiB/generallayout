// @flow
import React from "react";

import CaseViewContainer from "beinformed/modules/CaseView/CaseViewContainer";
import RootListContainer from "beinformed/modules/RootList/RootListContainer";

export type TabComponentProps = {
  activeComponent: "none" | "caseview" | "rootlist"
};
/**
 * Renders the correct root container. List or caseview
 */
const TabComponent = ({ activeComponent }: TabComponentProps) => {
  if (activeComponent === "caseview") {
    return <CaseViewContainer />;
  } else if (activeComponent === "rootlist") {
    return <RootListContainer />;
  }

  return null;
};

export default TabComponent;
