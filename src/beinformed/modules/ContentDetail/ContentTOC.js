// @flow
import React from "react";

import ContentLink from "beinformed/modules/ContentDetail/ContentLink";

import "./ContentTOC.scss";

import type ContentTOCModel from "beinformed/models/content/ContentTOCModel";
import type ContentModel from "beinformed/models/content/ContentModel";
import type ContentLinkModel from "beinformed/models/content/ContentLinkModel";
import type Href from "beinformed/models/href/Href";

type ContentTOCTreeProps = {
  items: Array<ContentLinkModel>,
  contentDetail: ContentModel,
  onContentClick: (href: Href) => void
};

/**
 * Toc Tree, recursevily
 */
const ContentTOCTree = ({
  items,
  contentDetail,
  onContentClick
}: ContentTOCTreeProps) => {
  /**
   * Check if link is active
   */
  const isActiveHref = (link, content) => {
    if (!content || !content.selfhref) {
      return false;
    }

    if (link.selfhref.equals(content.selfhref)) {
      return true;
    } else if (link.items) {
      return (
        typeof link.items.find(item => isActiveHref(item, content)) !==
        "undefined"
      );
    }

    return false;
  };

  return (
    <ul className="nav content-toc flex-column">
      {items.map((link: ContentLinkModel, idx: number) => (
        <ContentLink
          key={`${link.key}-${idx}`}
          content={link}
          isActive={isActiveHref(link, contentDetail)}
          onClick={onContentClick}
        >
          {link.items && (
            <ContentTOCTree
              items={link.items}
              contentDetail={contentDetail}
              onContentClick={onContentClick}
            />
          )}
        </ContentLink>
      ))}
    </ul>
  );
};

type ContentTOCProps = {
  contentTOC: ContentTOCModel,
  contentDetail: ContentModel,
  onContentClick: (href: Href) => void
};

/**
 * Content TOC
 */
const ContentTOC = ({
  contentDetail,
  contentTOC,
  onContentClick
}: ContentTOCProps) => (
  <ContentTOCTree
    items={contentTOC.items}
    contentDetail={contentDetail}
    onContentClick={onContentClick}
  />
);

export default ContentTOC;
