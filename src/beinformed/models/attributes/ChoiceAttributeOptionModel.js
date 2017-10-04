// @flow
import { DateUtil } from "beinformed/util/datetime/DateTimeUtil";
import BaseModel from "beinformed/models/base/BaseModel";
import LinkCollection from "beinformed/models/links/LinkCollection";
import ChoiceAttributeOptionCollection from "beinformed/models/attributes/ChoiceAttributeOptionCollection";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";
import type ContentModel from "beinformed/models/content/ContentModel";
import type LinkModel from "beinformed/models/links/LinkModel";
import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";

/**
 * Choice attribute option model
 */
class ChoiceAttributeOptionModel extends BaseModel {
  _referenceDate: string;
  _links: LinkCollection;
  _concept: ConceptDetailModel | null;
  _content: Map<string, ContentModel>;
  _level: number;
  _children: ChoiceAttributeOptionCollection;
  _isBooleanType: boolean;

  constructor(data: OptionType, referenceDate: string = DateUtil.now()) {
    super(data);

    this._referenceDate = referenceDate;
    this._links = new LinkCollection(this.data._links);
    this._concept = null;
    this._content = new Map();
    this._level = 0;
    this._isBooleanType = this.data.isBooleanType || false;

    if (
      this.data.children &&
      this.data.children !== null &&
      Array.isArray(this.data.children)
    ) {
      const options = this.data.children.map(
        childOption =>
          new ChoiceAttributeOptionModel(childOption, referenceDate)
      );

      if (options.length > 0) {
        this._children = new ChoiceAttributeOptionCollection();
        this._children.collection = options;
      }
    }
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    const initialLinks = [];

    if (this.conceptLink !== null) {
      initialLinks.push(this.conceptLink);
    }

    if (this.children) {
      initialLinks.push(...this.children.getInitialChildModelLinks());
    }

    return initialLinks;
  }

  /**
   * @override
   */
  setChildModels(models: ResolvableModels[]) {
    if (this.conceptLink !== null) {
      const conceptHref = this.conceptLink.href;

      const conceptModel = models.find(model =>
        model.selfhref.equalsWithParameters(conceptHref)
      );

      if (conceptModel) {
        this.concept = conceptModel;
      }
    }

    if (this.children) {
      this.children.setChildModels(models);
    }
  }

  /**
   * Get code of option
   */
  get code(): string {
    return this.data.code || this.data.key || "";
  }

  /**
   * Get label of option
   */
  get label(): string {
    return this.data.label || "";
  }

  /**
   * Indicates if option is selected
   */
  get selected(): boolean {
    return "selected" in this.data && this.data.selected === true;
  }

  /**
   * Set selected property of option
   */
  set selected(selected: boolean) {
    this.data.selected = selected;
  }

  /**
   * Retrieve count of filter for option
   */
  get count(): number | null {
    return this.data.count || null;
  }

  /**
   * get children of option
   */
  get children(): ChoiceAttributeOptionCollection | null {
    return this._children || null;
  }

  /**
   * Retrieve links of attribute
   */
  get links(): LinkCollection {
    return this._links;
  }

  /**
   * referenceDate received from attribute
   */
  get referenceDate(): string {
    return this._referenceDate;
  }

  set referenceDate(date: string) {
    this._referenceDate = date;
  }

  /**
   * Retrieve concept link of attribute when available
   */
  get conceptLink(): LinkModel | null {
    const conceptLink = this.links.getLinkByKey("concept");

    if (conceptLink !== null) {
      conceptLink.href = conceptLink.href.addParameter(
        TIMEVERSION_FILTER_NAME,
        this.referenceDate
      );

      conceptLink.isCacheable = true;
    }

    return conceptLink;
  }

  /**
   * Get concept information
   */
  get concept(): ConceptDetailModel | null {
    return this._concept || null;
  }

  /**
   * Set concept
   */
  set concept(concept: ConceptDetailModel) {
    this._concept = concept;
  }

  /**
   * Add content model to attribute
   */
  addContent(type: string, content: ContentModel) {
    if (content.type !== "Content") {
      throw new Error(
        `Attribute.addContent: not a ContentModel for type ${type}`
      );
    }

    this._content.set(type, content);
  }

  /**
   * Get content models
   */
  get content(): Map<string, ContentModel> | null {
    return this._content;
  }

  /**
   * Get level of option, used in tree view choice attributes (taxonomy)
   */
  get level(): number {
    return this._level;
  }

  /**
   * Set level of option
   */
  set level(level: number) {
    this._level = level;
  }

  get isBooleanType(): boolean {
    return this._isBooleanType;
  }
}

export default ChoiceAttributeOptionModel;
