// @flow
import React from "react";

import ContentLink from "beinformed/modules/ContentDetail/ContentLink";
import type ContentTOCModel from "beinformed/models/content/ContentTOCModel";
import type ContentModel from "beinformed/models/content/ContentModel";
import type Href from "beinformed/models/href/Href";

type ContentCategoriesType = {
  contentDetail: ContentModel,
  contentTOC: ContentTOCModel,
  onContentClick: (href: Href) => void
};

/**
 * Content categories
 */
const ContentCategories = ({
  contentDetail,
  contentTOC,
  onContentClick
}: ContentCategoriesType) => {
  /**
   * Check if category is acteive
   */
  const isActiveHref = (itemHref, detail) =>
    detail && detail.selfhref ? itemHref.equals(detail.selfhref) : false;

  return (
    <ul className="nav flex-column content-toc">
      {contentTOC.categories.map((content, idx) => (
        <ContentLink
          key={`${content.key}-${idx}`}
          content={content}
          isActive={isActiveHref(content.selfhref, contentDetail)}
          onClick={onContentClick}
        />
      ))}
    </ul>
  );
};

export default ContentCategories;
