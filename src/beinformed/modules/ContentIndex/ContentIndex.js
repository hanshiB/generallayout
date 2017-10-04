// @flow
import React from "react";

import Href from "beinformed/models/href/Href";
import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";
import ContentLink from "beinformed/modules/ContentDetail/ContentLink";
import CharIndex from "beinformed/modules/CharIndex/CharIndex";
import { Message } from "beinformed/modules/I18n/Message";

import "./ContentIndex.scss";

import type ContentIndexModel from "beinformed/models/content/ContentIndexModel";

type ContentIndexProps = {
  contentIndex: ContentIndexModel,
  onCharClick: (href: Href) => void,
  onContentClick: (href: Href) => void
};

/**
 * Content index and filters
 */
const ContentIndex = ({
  contentIndex,
  onCharClick,
  onContentClick
}: ContentIndexProps) => {
  const indexFilter = contentIndex.indexfilter
    ? contentIndex.indexfilter.attribute
    : null;
  const activeChars =
    indexFilter instanceof ChoiceAttributeModel ? indexFilter.selected : [];
  const enabledChars =
    indexFilter instanceof ChoiceAttributeModel
      ? indexFilter.options.all.map(option => option.code)
      : [];

  return (
    <div className="catalog-index content-index">
      <h2>
        <Message id="ContentIndex.Header" defaultMessage="Content index" />
      </h2>
      {indexFilter && (
        <div className="char-index">
          <CharIndex
            active={activeChars}
            enabled={enabledChars}
            href={new Href(contentIndex.selfhref.path)}
            onSelect={onCharClick}
          />
        </div>
      )}

      {contentIndex.items.hasItems && (
        <ul className="nav flex-column mb-1 content-index-content">
          {contentIndex.items.all.map(content => (
            <ContentLink
              key={content.key}
              content={content}
              onClick={onContentClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContentIndex;
