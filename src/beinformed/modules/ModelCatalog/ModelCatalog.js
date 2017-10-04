// @flow
import React from "react";

import ContentBrowserLinkContainer from "beinformed/modules/ContentBrowser/ContentBrowserLinkContainer";
import ModelCatalogLinkContainer from "beinformed/modules/ModelCatalog/ModelCatalogLinkContainer";
import ConceptIndexContainer from "beinformed/modules/ConceptIndex/ConceptIndexContainer";
import ConceptDetailContainer from "beinformed/modules/ConceptDetail/ConceptDetailContainer";
import ModelCatalogSearchContainer from "beinformed/modules/ModelCatalog/ModelCatalogSearchContainer";

import ModelOverviewContainer from "beinformed/modules/ModelOverview/ModelOverviewContainer";

import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import type ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";

export type ModelCatalogProps = {
  conceptDetail: ConceptDetailModel,
  conceptIndex: ConceptIndexModel
};
/**
 * Default model catalog
 */
const ModelCatalog = ({ conceptDetail, conceptIndex }: ModelCatalogProps) => (
  <div className="catalog modelcatalog container-fluid mt-4">
    {conceptIndex &&
      conceptIndex.searchtermfilter && <ModelCatalogSearchContainer />}

    <ul className="nav nav-tabs mb-2 catalog-links">
      <li className="nav-item">
        <ModelCatalogLinkContainer isActive />
      </li>
      <li className="nav-item">
        <ContentBrowserLinkContainer />
      </li>
    </ul>

    {conceptIndex && !conceptDetail && <ModelOverviewContainer />}

    {conceptIndex && !conceptDetail && <ConceptIndexContainer />}

    {conceptDetail && <ConceptDetailContainer />}
  </div>
);

export default ModelCatalog;
