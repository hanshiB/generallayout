// @flow
import type ContentModel from "beinformed/models/content/ContentModel";
import type LinkModel from "beinformed/models/links/LinkModel";
import ResourceModel from "beinformed/models/base/ResourceModel";
import FilterCollection from "beinformed/models/filters/FilterCollection";
import ConceptTypeDetailModel from "beinformed/models/concepts/ConceptTypeDetailModel";
import ConceptRelationCollection from "beinformed/models/concepts/ConceptRelationCollection";
import SourceReferenceCollection from "beinformed/models/concepts/SourceReferenceCollection";
import Locales from "beinformed/i18n/Locales";
import Href from "beinformed/models/href/Href";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import type ModularUIResponse from "beinformed/modularui/ModularUIResponse";

/**
 * Model for concept details, available through modelcatalog
 */
export default class ConceptDetailModel extends ResourceModel {
  _relations: ConceptRelationCollection;
  _content: ContentModel[];
  _conceptType: ConceptTypeDetailModel;
  _sourceReferences: SourceReferenceCollection;
  _filterCollection: FilterCollection;

  /**
   * @override
   */
  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._relations = new ConceptRelationCollection(
      this.data.relations,
      this.entryDate
    );
    this._content = [];
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "ConceptDetail";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ConceptDetail"
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    const conceptTypeLink = this.links.getLinkByKey("concepttype");

    if (conceptTypeLink) {
      conceptTypeLink.isCacheable = true;
      return [conceptTypeLink];
    }

    return [];
  }

  /**
   * @override
   */
  setChildModels() {
    const conceptTypeModel = this.childModels.find(
      model => model.type === "ConceptTypeDetail"
    );

    if (conceptTypeModel) {
      this._conceptType = conceptTypeModel;
    }
  }

  /**
   * Retrieve concept detail identifier as key for this model
   */
  get key(): string {
    return this.data._id;
  }

  /**
  * Getting the self link of this Concept
  */
  get selfhref(): Href {
    const href = this.selflink.href;

    if (this.filterCollection.hasItems) {
      this.filterCollection.all.forEach(filter => {
        filter.params.forEach(param => {
          if (param.value) {
            href.setParameter(param.name, param.value);
          } else {
            href.removeParameter(param.name);
          }
        });
      });
    }

    return href;
  }

  /**
   * Get conceptType of concept
   */
  get conceptType(): ConceptTypeDetailModel {
    return this._conceptType;
  }

  /**
   * Get concept label
   */
  get label(): string {
    return this.data.conceptLabel;
  }

  /**
   * Get taxonomy type
   */
  get taxonomyType(): string {
    return this.data.taxonomyType || "default";
  }

  /**
   * Get concept relations collection
   */
  get relationsCollection(): ConceptRelationCollection {
    return this._relations;
  }

  /**
   * Get concept formula
   */
  get formula(): string {
    return this.data.formula;
  }

  /**
   * Get additional labels of concept
   */
  get labels(): Object[] {
    return this.conceptType.labelTypes
      ? this.conceptType.labelTypes.map(labelType => {
          const setting = this.data.labels
            ? this.data.labels.find(label => label.type === labelType._id)
            : {};

          return {
            ...labelType,
            ...setting
          };
        })
      : [];
  }

  /**
   * Get label elements by id
   */
  getLabelElementByIds(ids: string[]) {
    return this.labels.filter(label => ids.includes(label._id));
  }

  /**
   * Get concept properties
   */
  get conceptProperties(): Object[] {
    return this.conceptType.propertyTypes
      ? this.conceptType.propertyTypes.map(propertyType => {
          const setting = this.data.properties
            ? this.data.properties.find(
                property => property.type === propertyType._id
              )
            : {};

          return {
            ...propertyType,
            ...setting
          };
        })
      : [];
  }

  /**
   * Get concept properties by id
   */
  getConceptPropertiesByIds(ids: string[]) {
    return this.conceptProperties.filter(property =>
      ids.includes(property._id)
    );
  }

  /**
   * Get Text fragments
   */
  get textfragments(): Object[] {
    return this.conceptType.textFragmentTypes
      ? this.conceptType.textFragmentTypes.map(textFragmentType => {
          const setting = this.data.textFragments
            ? this.data.textFragments.find(
                textfragment => textfragment.type === textFragmentType._id
              )
            : {};

          return {
            ...textFragmentType,
            ...setting
          };
        })
      : [];
  }

  /**
   * Get text fragments by id
   */
  getTextFragmentByKeys(keys: string[]) {
    return this.textfragments.filter(textfragment =>
      keys.includes(textfragment.type)
    );
  }

  /**
   * Get source reference collection
   */
  get sourceReferenceCollection(): SourceReferenceCollection {
    if (!this._sourceReferences) {
      this._sourceReferences = new SourceReferenceCollection(
        this.getSourceReferencesForCurrentLanguage(),
        this.conceptType.sectionReferenceTypes,
        this.entryDate
      );
    }

    return this._sourceReferences;
  }

  /*
   * Retrieve all sourceReferenceTypes that are valid for the current language
   * Used by sourceRef collection
   */
  getSourceReferencesForCurrentLanguage() {
    const LANGUAGE_POSTFIX_LENGTH = 3;
    if (this.data.sourceReferences) {
      const availableLanguagesInSourceReferences = this.data.sourceReferences.map(
        sourceReference =>
          sourceReference.type.substring(
            sourceReference.type.length - LANGUAGE_POSTFIX_LENGTH
          )
      );
      const availableLanguages = Locales.getAvailableLocaleCodes().map(
        locale => `_${locale.split("-")[0]}`
      );
      const currentLanguagePostfix = `_${this.locale}`;

      if (
        availableLanguagesInSourceReferences.includes(currentLanguagePostfix)
      ) {
        // return all sourceReferences that end with language that is selected
        return this.data.sourceReferences.filter(sourceReference =>
          sourceReference.type.endsWith(currentLanguagePostfix)
        );
      }
      // return all sourceReferences that do not end with language postfix
      return this.data.sourceReferences.filter(
        sourceReference =>
          !availableLanguages.includes(
            sourceReference.type.substring(
              sourceReference.type.length - LANGUAGE_POSTFIX_LENGTH
            )
          )
      );
    }
    return [];
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
    const entryDateAttribute = this.filterCollection.getFilterByAttributeKey(
      TIMEVERSION_FILTER_NAME
    );

    if (entryDateAttribute !== null) {
      return entryDateAttribute.attribute.value;
    }

    return null;
  }

  /**
   * Content
   */
  get content(): ContentModel[] {
    return this._content;
  }

  /**
   * Add content to array of content
   */
  addContent(content: ContentModel) {
    this._content.push(content);
  }
}
