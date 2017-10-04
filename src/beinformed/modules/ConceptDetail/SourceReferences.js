// @flow
import React from "react";

import ContentLink from "beinformed/modules/ContentDetail/ContentLink";
import ContentSections from "beinformed/modules/ContentDetail/ContentSections";
import type ContentModel from "beinformed/models/content/ContentModel";
import type SourceReferenceCollection from "beinformed/models/concepts/SourceReferenceCollection";
import type Href from "beinformed/models/href/Href";
import { Message } from "beinformed/modules/I18n/Message";

type SourceReferencesType = {
  sourceReferences: SourceReferenceCollection,
  sources: ContentModel[],
  onContentClick: (href: Href) => void
};

/**
 * Source references
 */
const SourceReferences = ({
  sourceReferences,
  sources,
  onContentClick
}: SourceReferencesType) => {
  // remove duplicate sourcereferences (there can be multiple source references that point to differenct sections)
  const sourceRefs = sourceReferences.all.filter(
    (sourceReference, index, self) =>
      self.findIndex(selfRef =>
        selfRef.link.selfhref.equals(sourceReference.link.selfhref)
      ) === index
  );

  const getSourceReferences = sourceRef =>
    sourceReferences.all.filter(
      sourceReference =>
        sourceRef.link &&
        sourceReference.link.selfhref.equals(sourceRef.link.selfhref)
    );

  return (
    <div className="source-references mb-4">
      <h5>
        <Message
          id="SourceReferences.Header"
          defaultMessage="Content references"
        />
      </h5>
      {sourceRefs.map((sourceRef, refIdx) => (
        <div key={refIdx} className="sourceRef">
          <ul key={sourceRef.key} className="nav flex-column mb-1">
            {getSourceReferences(sourceRef).map((sourceReference, idx) => (
              <ContentLink
                key={`${sourceRef.key}-${idx}`}
                content={sourceReference.link}
                onClick={onContentClick}
              />
            ))}
          </ul>

          {sources
            .filter(source => source.selfhref.equals(sourceRef.link.selfhref))
            .map((content, idx) => (
              <ContentSections
                key={`contentsections-${idx}`}
                contentDetail={content}
                highlightSections={sourceReferences.all.map(
                  highlightSourceRef => highlightSourceRef.link
                )}
                highlightIntoview
                onContentClick={onContentClick}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default SourceReferences;
