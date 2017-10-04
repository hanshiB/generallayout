// @flow
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";

/**
 * Password attribute
 */
export default class PasswordAttributeModel extends StringAttributeModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "password";
  }

  /**
   * Update the attribute by name and value
   */
  update(value: string) {
    this.updateLastModification();
    this.inputvalue = value;

    return this;
  }
}
