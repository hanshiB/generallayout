// @flow
import React from "react";

import ContentLink from "beinformed/modules/ContentDetail/ContentLink";
import type ContentLinkModel from "beinformed/models/content/ContentLinkModel";
import type Href from "beinformed/models/href/Href";

type ContentChildSectionLinksType = {
  childSectionLinks: Array<ContentLinkModel>,
  onContentClick?: (href: Href) => void
};

/**
 * Content child section links
 */
const ContentChildSectionLinks = ({
  childSectionLinks,
  onContentClick
}: ContentChildSectionLinksType) => (
  <div className="content-childsection">
    <ul className="nav flex-column">
      {childSectionLinks.map((childSection: ContentLinkModel, idx) => (
        <ContentLink
          key={`${childSection.key}-${idx}`}
          content={childSection}
          onClick={onContentClick}
        />
      ))}
    </ul>
  </div>
);

export default ContentChildSectionLinks;
