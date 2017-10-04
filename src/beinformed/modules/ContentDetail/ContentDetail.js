// @flow
import React, { Component } from "react";
import classNames from "classnames";

import type ContentModel from "beinformed/models/content/ContentModel";
import type ContentTOCModel from "beinformed/models/content/ContentTOCModel";
import type ContentLinkModel from "beinformed/models/content/ContentLinkModel";
import ContentCategories from "beinformed/modules/ContentDetail/ContentCategories";
import ContentTOC from "beinformed/modules/ContentDetail/ContentTOC";
import ContentTOCHeader from "beinformed/modules/ContentDetail/ContentTOCHeader";
import RelatedConcepts from "beinformed/modules/ContentDetail/RelatedConcepts";
import ContentSections from "beinformed/modules/ContentDetail/ContentSections";

type ContentDetailProps = {
  contentDetail: ContentModel,
  contentTOC: ContentTOCModel,
  onConceptClick: Function,
  onContentClick: Function
};

type ContentDetailState = {
  highlightSections: ContentLinkModel[]
};

/**
 * Render Content details
 */
class ContentDetail extends Component<ContentDetailProps, ContentDetailState> {
  constructor(props: ContentDetailProps) {
    super(props);

    this.state = {
      highlightSections: []
    };
  }

  /**
   * Save highlighted sections when a related concept is hovered
   */
  handleConceptEnter(relatedConcept: ConceptDetailModel) {
    this.setState({
      highlightSections: relatedConcept.sourceReferenceCollection.all.map(
        sourceRef => sourceRef.link
      )
    });
  }

  /**
   * Remove highlighted sections when a related concept is no longer hovered
   */
  handleConceptLeave() {
    this.setState({
      highlightSections: []
    });
  }

  /**
   * @Override
   */
  render() {
    const hasRelatedConcepts =
      this.props.contentDetail &&
      typeof this.props.contentDetail.relatedConcepts !== "undefined";
    const tocClass = classNames({
      "col-md-2": typeof this.props.contentDetail !== "undefined",
      "col-md-12": !this.props.contentDetail
    });
    const detailClass = classNames({
      "col-md-7": this.props.contentTOC && hasRelatedConcepts,
      "col-md-9": !this.props.contentTOC && hasRelatedConcepts,
      "col-md-10": this.props.contentTOC && !hasRelatedConcepts,
      "col-md-12": !this.props.contentTOC && !hasRelatedConcepts
    });

    return (
      <div className="content-detail">
        {this.props.contentTOC && (
          <ContentTOCHeader contentTOC={this.props.contentTOC} />
        )}

        <div className="row">
          {this.props.contentTOC &&
            this.props.contentTOC.items.length > 0 && (
              <div className={tocClass}>
                <ContentTOC
                  contentTOC={this.props.contentTOC}
                  contentDetail={this.props.contentDetail}
                  onContentClick={this.props.onContentClick}
                />
              </div>
            )}

          {this.props.contentTOC &&
            this.props.contentTOC.categories.length > 0 && (
              <div className={tocClass}>
                <ContentCategories
                  contentTOC={this.props.contentTOC}
                  contentDetail={this.props.contentDetail}
                  onContentClick={this.props.onContentClick}
                />
              </div>
            )}

          {this.props.contentDetail && (
            <ContentSections
              className={detailClass}
              contentDetail={this.props.contentDetail}
              highlightSections={this.state.highlightSections}
              onContentClick={this.props.onContentClick}
            />
          )}

          {hasRelatedConcepts && (
            <div className="col-md-3">
              <RelatedConcepts
                concepts={this.props.contentDetail.relatedConcepts.concepts}
                onConceptClick={this.props.onConceptClick}
                onConceptEnter={relatedConcept =>
                  this.handleConceptEnter(relatedConcept)}
                onConceptLeave={() => this.handleConceptLeave()}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ContentDetail;
