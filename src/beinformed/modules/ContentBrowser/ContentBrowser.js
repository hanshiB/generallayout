// @flow
import React from "react";

import type ContentModel from "beinformed/models/content/ContentModel";
import type ContentTOCModel from "beinformed/models/content/ContentTOCModel";
import type ContentIndexModel from "beinformed/models/content/ContentIndexModel";
import ModelCatalogLinkContainer from "beinformed/modules/ModelCatalog/ModelCatalogLinkContainer";
import ContentBrowserLinkContainer from "beinformed/modules/ContentBrowser/ContentBrowserLinkContainer";
import ContentIndexContainer from "beinformed/modules/ContentIndex/ContentIndexContainer";
import ContentDetailContainer from "beinformed/modules/ContentDetail/ContentDetailContainer";

export type ContentBrowserProps = {
  contentDetail: ContentModel,
  contentIndex: ContentIndexModel,
  contentTOC: ContentTOCModel
};

/**
 * Default source browser
 */
const ContentBrowser = ({
  contentIndex,
  contentDetail,
  contentTOC
}: ContentBrowserProps) => (
  <div className="catalog contentbrowser container-fluid mt-4">
    <ul className="nav nav-tabs mb-2 catalog-links">
      <li className="nav-item">
        <ModelCatalogLinkContainer />
      </li>
      <li className="nav-item">
        <ContentBrowserLinkContainer isActive />
      </li>
    </ul>

    {contentIndex && !contentTOC && !contentDetail && <ContentIndexContainer />}

    {(contentTOC || contentDetail) && <ContentDetailContainer />}
  </div>
);

export default ContentBrowser;
