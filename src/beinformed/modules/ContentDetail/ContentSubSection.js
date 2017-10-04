// @flow
import React, { Component } from "react";
import classNames from "classnames";

import ContentSubSections from "beinformed/modules/ContentDetail/ContentSubSections";
import ContentBody from "beinformed/modules/ContentDetail/ContentBody";
import type Href from "beinformed/models/href/Href";
import type ContentLinkModel from "beinformed/models/content/ContentLinkModel";
import type SubSectionModel from "beinformed/models/content/SubSectionModel";

import "./ContentSubSections.scss";

type ContentSubSectionProps = {
  highlightIntoview: boolean,
  highlightSections: ContentLinkModel[],
  isActive: boolean,
  isFirst: boolean,
  renderSectionLabel?: boolean,
  scrollIntoView: boolean,
  sourceHref: Href,
  subSection: SubSectionModel,
  onContentClick?: Function
};

/**
 * Render single content sub section
 */
class ContentSubSection extends Component<ContentSubSectionProps> {
  _section: ?HTMLDivElement;

  componentDidMount() {
    if (
      this.props.scrollIntoView &&
      this.props.isActive &&
      this.props.isFirst
    ) {
      const scrollTopMargin = 30;

      if (this._section) {
        this._section.offsetParent.scrollTop =
          this._section.offsetTop - scrollTopMargin;
      }
    }
  }

  render() {
    const {
      highlightSections,
      highlightIntoview,
      isActive,
      sourceHref,
      subSection,
      renderSectionLabel,
      onContentClick
    } = this.props;

    /**
     * Create css class
     */
    const sectionClass = classNames("subsection", {
      "has-number": typeof subSection.number !== "undefined",
      "has-label": typeof subSection.label !== "undefined",
      active: isActive
    });

    return (
      <div
        ref={section => {
          this._section = section;
        }}
        key={subSection.key}
        className={sectionClass}
      >
        <ContentBody
          number={subSection.number}
          label={subSection.label}
          body={subSection.body}
          sourceHref={sourceHref}
          renderSectionLabel={renderSectionLabel}
          onContentClick={onContentClick}
        />
        {subSection.subSections.length > 0 && (
          <ContentSubSections
            subSections={subSection.subSections}
            sourceHref={sourceHref}
            highlightSections={highlightSections}
            highlightIntoview={highlightIntoview}
            onContentClick={onContentClick}
          />
        )}
      </div>
    );
  }
}

export default ContentSubSection;
