// @flow
import type LinkModel from "beinformed/models/links/LinkModel";
import Href from "beinformed/models/href/Href";
import ResourceModel from "beinformed/models/base/ResourceModel";
import ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";

/**
 * The Application model
 */
export default class ModelCatalogModel extends ResourceModel {
  _conceptIndex: ConceptIndexModel;

  /**
   * @overwrite
   */
  get type(): string {
    return "ModelCatalog";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ModelCatalog"
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    if (this.conceptIndexLink) {
      return [this.conceptIndexLink];
    }

    return [];
  }

  /**
   * @override
   */
  setChildModels() {
    const conceptIndexModel = this.childModels.find(
      model => model.type === "ConceptIndex"
    );

    if (conceptIndexModel) {
      this.conceptIndex = conceptIndexModel;
    }
  }

  /**
   * Retrieve link to Concept Index model
   */
  get conceptIndexLink(): LinkModel | null {
    return this.links.getLinkByKey("concepts");
  }

  /**
   * Retrieve href to Concept Index model
   */
  get conceptIndexHref(): Href | null {
    return this.conceptIndexLink === null ? null : this.conceptIndexLink.href;
  }

  /**
   * Retrieve link to Content Index model
   */
  get contentIndexLink(): LinkModel | null {
    return this.links.getLinkByKey("content");
  }

  /**
  * set conceptindex
  */
  set conceptIndex(conceptIndex: ConceptIndexModel) {
    this._conceptIndex = conceptIndex;
  }

  /**
   * returns the conceptindex configured for this application
   */
  get conceptIndex(): ConceptIndexModel | null {
    return this._conceptIndex || null;
  }
}
