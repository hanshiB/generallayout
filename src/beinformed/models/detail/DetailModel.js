// @flow
import ActionCollection from "beinformed/models/actions/ActionCollection";
import AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import Href from "beinformed/models/href/Href";
import ResourceModel from "beinformed/models/base/ResourceModel";

import type ModularUIResponse from "beinformed/modularui/ModularUIResponse";

/**
 * Base class for details<br/>
 * For instance the details of case 1<br/>
 * For instance the details of record 12<br/>
 */
export default class DetailModel extends ResourceModel {
  _attributeCollection: AttributeCollection;
  _metadataCollection: AttributeCollection;
  _selfhref: Href;
  _actionCollection: ActionCollection;

  /**
   * constructor
   */
  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._attributeCollection = new AttributeCollection(
      this.data,
      this.contributions.attributes,
      true
    );

    const metadataContributions = this.contributions.metadata
      ? Object.keys(this.contributions.metadata).map(metadataKey => ({
          [metadataKey]: this.contributions.metadata[metadataKey]
        }))
      : [];

    this._metadataCollection = new AttributeCollection(
      this.data,
      metadataContributions,
      true
    );

    this._actionCollection = new ActionCollection(
      this.data.actions,
      this.contributions.actions
    );
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "Detail";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "Detail"
    );
  }

  /**
   * Getting the unique identifier of the details
   */
  get id(): number | string {
    return this.data._id;
  }

  /**
   * Retrieve attribute collection
   */
  get attributeCollection(): AttributeCollection {
    return this._attributeCollection;
  }

  /**
   * Set the attributes with a new AttributeCollection
   */
  set attributeCollection(collection: AttributeCollection) {
    this._attributeCollection = collection;
  }

  /**
   * Retrieve an attribute by it's key
   */
  getAttributeByKey(key: string) {
    return this._attributeCollection.getAttributeByKey(key);
  }

  /**
   * Retrieve metadata collection
   */
  get metadataCollection(): AttributeCollection {
    return this._metadataCollection;
  }

  /**
   * Set the metadata with a new AttributeCollection
   */
  set metadataCollection(collection: AttributeCollection) {
    this._metadataCollection = collection;
  }

  /**
   * Getting available actions
   */
  get actionCollection(): ActionCollection {
    return this._actionCollection;
  }

  /**
   * Set the action with a new ActionCollection
   */
  set actionCollection(actionCollection: ActionCollection) {
    this._actionCollection = actionCollection;
  }

  /**
   * Determines if this is a case
   */
  isCase() {
    return this.contributions.resourcetype === "CaseView";
  }

  /**
   * Retrieve if detail exists
   */
  hasDetail() {
    return this.key !== null;
  }

  /**
   * Getting the attribute that has as layout hint 'title'
   */
  get titleAttribute(): AttributeType {
    const titleAttribute = this._attributeCollection.getAttributeByLayoutHint(
      "title"
    );
    const casenameAttribute = this._metadataCollection.getAttributeByKey(
      "casename"
    );

    if (titleAttribute) {
      return titleAttribute;
    } else if (
      this.isCase() &&
      this._metadataCollection.hasAttributeByKey("casename") &&
      casenameAttribute !== null
    ) {
      return casenameAttribute;
    } else if (this.attributeCollection.size > 0) {
      const attr =
        this.attributeCollection.find(
          attribute =>
            (Array.isArray(attribute.readonlyvalue) &&
              attribute.readonlyvalue.length > 0) ||
            (!Array.isArray(attribute.readonlyvalue) &&
              attribute.readonlyvalue !== "")
        ) || this.attributeCollection.first;

      if (attr !== null) {
        return attr;
      }
    }

    throw new Error(
      "Can not find an attribute on this detail, therefor no title attribute is found"
    );
  }

  /**
   * Update current detail with a new detail model and return a cloned version of the model
   */
  update(model: DetailModel) {
    const clonedModel = this.clone();

    clonedModel.attributeCollection = model._attributeCollection;
    clonedModel.metadataCollection = model._metadataCollection;
    clonedModel.actionCollection = model._actionCollection;

    return clonedModel;
  }
}
