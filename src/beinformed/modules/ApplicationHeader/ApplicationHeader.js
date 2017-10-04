// @flow
import React from "react";

import MainMenuContainer from "beinformed/modules/MainMenu/MainMenuContainer";
import TopHeader from "beinformed/modules/ApplicationHeader/TopHeader";

import "./ApplicationHeader.scss";

/**
 * Render the application header
 */
const ApplicationHeader = ({
  hideModelCatalog = true
}: {
  hideModelCatalog: boolean
}) => (
  <div className="application-header">
    <TopHeader hideModelCatalog={hideModelCatalog} />
    <MainMenuContainer />
  </div>
);

export default ApplicationHeader;
