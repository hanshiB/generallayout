// @flow
import LinkCollection from "beinformed/models/links/LinkCollection";
import ResourceModel from "beinformed/models/base/ResourceModel";
import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import type LinkModel from "beinformed/models/links/LinkModel";
import type ModularUIResponse from "beinformed/modularui/ModularUIResponse";
/**
 * Related concepts
 */
class RelatedConceptsModel extends ResourceModel {
  _concepts: ConceptDetailModel[];

  /**
   * @override
   */
  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._concepts = [];
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "RelatedConcepts";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "relatedConcepts"
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    return this.conceptLinks.all;
  }

  /**
   * @override
   */
  setChildModels() {
    this._concepts = this.childModels.filter(
      model => model.type === "List" || model.type === "ConceptDetail"
    );
  }

  /**
   * Retrieve concept links related to content
   */
  get conceptLinks(): LinkCollection {
    return this.links.getLinksByGroup("concepts");
  }

  /**
   * Retrieve a sorted array of related concept models
   */
  get concepts(): ConceptDetailModel[] {
    return this._concepts.sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }

      return 0;
    });
  }
}

export default RelatedConceptsModel;
