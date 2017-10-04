// @flow
import ResourceModel from "beinformed/models/base/ResourceModel";
import FilterCollection from "beinformed/models/filters/FilterCollection";
import ContentLinkModel from "beinformed/models/content/ContentLinkModel";
import ContentTypeModel from "beinformed/models/content/ContentTypeModel";
import SubSectionModel from "beinformed/models/content/SubSectionModel";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";
import type RelatedConceptsModel from "beinformed/models/content/RelatedConceptsModel";
import type LinkModel from "beinformed/models/links/LinkModel";

/**
 * Content detail model
 */
export default class ContentModel extends ResourceModel {
  _contentType: ContentTypeModel;
  _filterCollection: FilterCollection;
  _relatedConcepts: RelatedConceptsModel;
  _childSections: ContentModel[];

  /**
   * @overwrite
   */
  get type(): "Content" {
    return "Content";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ContentDetail"
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    const contentTypeLink = this.links.getLinkByKey("contenttype");

    if (contentTypeLink) {
      return [contentTypeLink];
    }

    return [];
  }

  /**
   * @override
   */
  setChildModels() {
    const contentTypeModel = this.childModels.find(
      model => model.type === "ContentType"
    );

    if (contentTypeModel) {
      this._contentType = contentTypeModel;
    }
  }

  /**
   * Retrieve available filters on concept toc
   */
  get filterCollection(): FilterCollection {
    if (!this._filterCollection) {
      this._filterCollection = new FilterCollection(this.data.filter, {
        filter: this.contributions.filter,
        contexts: this.contributions.contexts,
        dynamicschema: this.data.dynamicschema
      });
    }

    return this._filterCollection;
  }

  /**
   * Retrieve entrydate of content toc
   */
  get entryDate(): string | null {
    const entryDateFilter = this.filterCollection.getFilterByAttributeKey(
      TIMEVERSION_FILTER_NAME
    );
    if (entryDateFilter) {
      return entryDateFilter.attribute.value;
    }

    return null;
  }

  /**
   * Get conceptType of concept
   */
  get contentType(): ContentTypeModel {
    return this._contentType;
  }

  /**
   * Get content label
   */
  get label(): string {
    return this.data.label;
  }

  /**
   * Get number of content, for instance 'lid 1', 'artikel 1', etc.
   */
  get number(): string {
    return this.data.number;
  }

  /**
   * Get content body
   */
  get body(): string {
    return this.data.body;
  }

  /**
   * Retrieve child section links
   */
  get childSectionLinks(): ContentLinkModel[] {
    return this.data.childSections
      ? this.data.childSections.map(
          childSection => new ContentLinkModel(childSection, this.entryDate)
        )
      : [];
  }

  /**
   * Get tree of child sections
   */
  get childSections(): ContentModel[] {
    return this._childSections || [];
  }

  /**
   * set resolved child sections
   */
  set childSections(sections: ContentModel[]) {
    this._childSections = sections || [];
  }

  /**
   * Get sub sections
   */
  get subSections(): SubSectionModel[] {
    return this.data.subSections
      ? this.data.subSections.map(subSection => new SubSectionModel(subSection))
      : [];
  }

  /**
   * Get related concepts link
   */
  get relatedConceptsLink(): LinkModel | null {
    return this.links.getLinkByKey("relatedConcepts");
  }

  /**
   * Get related concepts
   */
  set relatedConcepts(relatedConcepts: RelatedConceptsModel) {
    this._relatedConcepts = relatedConcepts;
  }

  /**
   * Retrieve related concepts
   */
  get relatedConcepts(): RelatedConceptsModel {
    return this._relatedConcepts;
  }
}
