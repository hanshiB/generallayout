// @flow
import AttributeModel from "beinformed/models/attributes/AttributeModel";
import BSNAttributeModel from "beinformed/models/attributes/BSNAttributeModel";
import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";
import DateAttributeModel from "beinformed/models/attributes/DateAttributeModel";
import HelptextAttributeModel from "beinformed/models/attributes/HelptextAttributeModel";
import IBANAttributeModel from "beinformed/models/attributes/IBANAttributeModel";
import ImageAttributeModel from "beinformed/models/attributes/ImageAttributeModel";
import LabelAttributeModel from "beinformed/models/attributes/LabelAttributeModel";
import LookupAttributeModel from "beinformed/models/attributes/LookupAttributeModel";
import MemoAttributeModel from "beinformed/models/attributes/MemoAttributeModel";
import MoneyAttributeModel from "beinformed/models/attributes/MoneyAttributeModel";
import NumberAttributeModel from "beinformed/models/attributes/NumberAttributeModel";
import PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";
import CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import TimeAttributeModel from "beinformed/models/attributes/TimeAttributeModel";
import TimestampAttributeModel from "beinformed/models/attributes/TimestampAttributeModel";
import UploadAttributeModel from "beinformed/models/attributes/UploadAttributeModel";
import XMLAttributeModel from "beinformed/models/attributes/XMLAttributeModel";

type ChildrenKeysType = Array<{
  key: string,
  children: ChildrenKeysType
}>;

class AttributeDataHelper {
  _key: string;
  _attribute: Object;
  _value: any;
  _children: Array<AttributeDataHelper>;

  constructor(data: any, key: string, childrenKeys: ChildrenKeysType) {
    this._key = key;

    if (Array.isArray(data)) {
      this._attribute =
        data.find(attr => attr.elementid === key || attr.name === key) || {};

      this._value = this.getValue(this._attribute);
    } else {
      this._attribute = data;
      this._value = data[key] || this.getValue(data);
    }

    this._children = this.createChildren(
      this.getChildData(key, data),
      childrenKeys
    );
  }

  getChildData(key, data) {
    if (Array.isArray(data)) {
      return (
        data.find(attr => attr.elementid === key || attr.name === key) || {}
      );
    } else if (key in data) {
      if (typeof data[key] === "object") {
        return data[key];
      }
      return { [key]: data[key] };
    }

    return data;
  }

  createChildren(data, keys: ChildrenKeysType = []) {
    return keys.map(
      keyObject =>
        new AttributeDataHelper(
          this.getChildData(
            keyObject.key,
            this.getChildData(keyObject.key, data.elements || data)
          ),
          keyObject.key,
          keyObject.children
        )
    );
  }

  getValue(attribute) {
    if ("values" in attribute) {
      return attribute.values;
    }

    if ("value" in attribute) {
      return attribute.value;
    }

    if ("suggestions" in attribute) {
      return attribute.suggestions;
    }

    if ("suggestion" in attribute) {
      return attribute.suggestion;
    }

    return null;
  }

  get key() {
    return this._key;
  }

  get value() {
    return this._value;
  }

  get static() {
    return this._attribute.static || false;
  }

  get links() {
    return this._attribute._links || void 0;
  }

  get dynamicschema() {
    if (
      this._attribute.dynamicschema &&
      this._attribute.dynamicschema[this.key]
    ) {
      return this._attribute.dynamicschema[this.key];
    } else if (Array.isArray(this._attribute.dynamicschema)) {
      return this._attribute.dynamicschema;
    }

    return void 0;
  }

  get options() {
    return this._attribute.options || void 0;
  }

  get message() {
    return this._attribute.message || void 0;
  }

  get isResult() {
    return this._attribute.isResult || false;
  }

  get referenceDate() {
    return this._attribute.referenceDate || void 0;
  }

  get children(): Array<AttributeDataHelper> {
    return this._children || [];
  }

  getData(): AttributeJSON {
    return {
      key: this.key,
      value: this.value,
      static: this.static,
      _links: this.links,
      dynamicschema: this.dynamicschema,
      options: this.options,
      message: this.message,
      isResult: this.isResult,
      referenceDate: this.referenceDate,
      children: this.children.map(child => child.getData())
    };
  }
}

class AttributeFactory {
  /**
   * Get type of attribute based on layouthint, specific properties or base type
   */
  static getTypeFromContributions(contributions: AttributeContributionsJSON) {
    if (contributions.children) {
      return "composite";
    }

    const layouthint = contributions ? contributions.layouthint || [] : [];
    const layouthintTypes = [
      "bsn",
      "iban",
      "password",
      "image",
      "label",
      "money",
      "xml"
    ];

    const type = layouthintTypes.find(hint => layouthint.includes(hint));
    if (type) {
      return type;
    }

    if (contributions.type === "assignment") {
      return "assignment";
    }

    if (contributions.optionMode === "lookup") {
      return "lookup";
    }

    if (
      contributions.enumerated ||
      contributions.options ||
      contributions.type === "array"
    ) {
      return "choice";
    }

    const rows = contributions.rows ? parseInt(contributions.rows, 10) : null;
    if (rows && rows > 1) {
      return "memo";
    }

    if (contributions.readonly && contributions.text) {
      return "helptext";
    }

    if (contributions.type && contributions.type.includes("range")) {
      return "range";
    }

    if (contributions.type && contributions.type === "number") {
      return "number";
    }

    return contributions.type;
  }

  static getAttributeModelFromContributions(
    defaultType,
    contributions
  ): AttributeType {
    const attributeMap = {
      assignment: AttributeModel,
      array: ChoiceAttributeModel,
      binary: UploadAttributeModel,
      boolean: ChoiceAttributeModel,
      bsn: BSNAttributeModel,
      choice: ChoiceAttributeModel,
      date: DateAttributeModel,
      datetime: TimestampAttributeModel,
      helptext: HelptextAttributeModel,
      iban: IBANAttributeModel,
      image: ImageAttributeModel,
      integer: NumberAttributeModel,
      label: LabelAttributeModel,
      lookup: LookupAttributeModel,
      memo: MemoAttributeModel,
      money: MoneyAttributeModel,
      number: NumberAttributeModel,
      password: PasswordAttributeModel,
      range: CompositeAttributeModel,
      composite: CompositeAttributeModel,
      string: StringAttributeModel,
      time: TimeAttributeModel,
      timestamp: TimestampAttributeModel,
      xml: XMLAttributeModel
    };

    const type =
      defaultType && defaultType in attributeMap
        ? defaultType
        : AttributeFactory.getTypeFromContributions(contributions);

    if (attributeMap.hasOwnProperty(type)) {
      return attributeMap[type];
    }

    return StringAttributeModel;
  }

  static createAttributeData(data, key, childrenKeys): AttributeJSON {
    return new AttributeDataHelper(data, key, childrenKeys).getData();
  }

  static getChildrenKeys(
    key: string,
    children: Array<{ [string]: AttributeContributionsJSON }>
  ): ChildrenKeysType {
    if (children) {
      return children.map(child => {
        const childKey = Object.keys(child)[0];
        if (
          child[childKey].type === "range" ||
          child[childKey].type === "composite"
        ) {
          return {
            key: childKey,
            children: AttributeFactory.getChildrenKeys(
              childKey,
              child[childKey].children
            )
          };
        }

        return {
          key: childKey,
          children: []
        };
      });
    }

    return [];
  }

  static createAttribute(
    defaultType: string | null,
    key: string,
    data: any,
    contributions: AttributeContributionsJSON
  ) {
    const AttrModel = this.getAttributeModelFromContributions(
      defaultType,
      contributions
    );

    const childrenKeys =
      contributions.type === "range" ||
      contributions.type === "numberrange" ||
      contributions.type === "daterange" ||
      contributions.type === "composite"
        ? AttributeFactory.getChildrenKeys(key, contributions.children)
        : [];

    const attributeData = AttributeFactory.createAttributeData(
      data,
      key,
      childrenKeys
    );

    return new AttrModel(attributeData, contributions);
  }
}

export default AttributeFactory;
