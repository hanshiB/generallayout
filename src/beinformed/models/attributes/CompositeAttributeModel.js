// @flow
import AttributeFactory from "beinformed/models/attributes/AttributeFactory";
import AttributeModel from "beinformed/models/attributes/AttributeModel";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import ErrorCollection from "beinformed/models/error/ErrorCollection";

class CompositeAttributeModel extends AttributeModel {
  _children: Array<AttributeType>;

  constructor(
    data: AttributeJSON,
    contributions: CompositeAttributeContributionsJSON
  ) {
    super(data, contributions);

    this.children = this.setChildren(data, contributions);
  }

  /**
   * @override
   */
  get type(): string {
    // temp fix for results and given answers on list result detail panel
    if (this.key === "results" || this.key === "givenAnswers") {
      return "composite";
    }

    return this.contributions.type === "range" ? "range" : "composite";
  }

  setChildren(
    data: AttributeJSON,
    contributions: CompositeAttributeContributionsJSON
  ) {
    if (
      contributions &&
      Array.isArray(contributions.children) &&
      data &&
      Array.isArray(data.children)
    ) {
      return contributions.children.map(contribution => {
        const key = Object.keys(contribution)[0];

        const attributeData = Array.isArray(data.children)
          ? data.children.find(attr => attr.key === key)
          : {};

        const attribute = AttributeFactory.createAttribute(
          contribution[key].type,
          key,
          attributeData,
          contribution[key]
        );

        return attribute;
      });
    }

    return [];
  }

  get children(): Array<AttributeType> {
    return this._children;
  }

  set children(children: Array<AttributeType>) {
    this._children = children;
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }

  get start(): AttributeType {
    return this.children[0];
  }

  get end(): AttributeType {
    return this.children[this.children.length - 1];
  }

  /**
   * Get input value of attribute
   */
  getInputValue(): string {
    return this.children.map(child => child.inputvalue).join(",");
  }

  /**
   * Constraints of a range attribute exist on it's childs
   * @returns {ConstraintCollection}
   */
  get constraintCollection(): ConstraintCollection {
    return new ConstraintCollection();
  }

  /**
   * Validate input
   */
  validate() {
    return this.children.every(child => child.isValid);
  }

  /**
   * Indicates if attribute input is valid
   */
  get isValid(): boolean {
    return this.validate();
  }

  /**
   * Retrieve error messages of this attribute
   */
  get errorCollection(): ErrorCollection {
    const collection = new ErrorCollection(
      "compositeattribute",
      this._errorCollection
    );

    this.children.forEach(child => {
      collection.add(child.errorCollection);
    });

    return collection;
  }

  /**
   * Reset attribute to empty string
   */
  reset() {
    this.children.forEach(child => {
      child.reset();
    });
  }

  getChildByKey(key: string): AttributeType | null {
    return (
      this.children.find(child => {
        if (child.key === key) {
          return true;
        } else if (child.children) {
          return child.getChildByKey(key);
        }

        return false;
      }) || null
    );
  }

  updateChild(childAttribute: AttributeType, value: string) {
    this.children.forEach(child => {
      if (child.children) {
        child.updateChild(childAttribute, value);
      } else if (child.key === childAttribute.key) {
        child.update(value);
      }
    });
  }

  getValue(): any {
    const children = {};

    this.children.forEach(child => {
      children[child.name] = child.value;
    });

    return children;
  }
}

export default CompositeAttributeModel;
