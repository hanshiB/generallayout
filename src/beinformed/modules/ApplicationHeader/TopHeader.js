// @flow
import React from "react";

import Locales from "beinformed/i18n/Locales";
import LanguageSelectorContainer from "beinformed/modules/I18n/LanguageSelectorContainer";
import AccountMenuContainer from "beinformed/modules/AccountMenu/AccountMenuContainer";
import ModelCatalogHeaderLinkContainer from "beinformed/modules/ModelCatalog/ModelCatalogHeaderLinkContainer";

import "./TopHeader.scss";

/**
 * Render the application header
 */
const TopHeader = ({
  hideModelCatalog = true
}: {
  hideModelCatalog: boolean
}) => (
  <div className="top-header">
    <ul className="nav justify-content-end">
      {!hideModelCatalog && (
        <li className="nav-item">
          <ModelCatalogHeaderLinkContainer />
        </li>
      )}
      <li className="dropdown nav-item">
        <AccountMenuContainer />
      </li>
      {Locales.all.length > 1 && (
        <li className="dropdown nav-item">
          <LanguageSelectorContainer />
        </li>
      )}
    </ul>
  </div>
);

export default TopHeader;
