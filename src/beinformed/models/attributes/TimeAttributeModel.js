// @flow
import { TimeUtil } from "beinformed/util/datetime/DateTimeUtil";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";

/**
 * Time attribute
 */
export default class TimeAttributeModel extends StringAttributeModel {
  _format: string;

  /**
   * Get initial value
   */
  getInitialInputValue(value: string | null) {
    return !value || value === null
      ? ""
      : TimeUtil.toFormat(value, this.format);
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "time";
  }

  /**
   * Get date format
   */
  get format(): string {
    return TimeUtil.convertFormat(this.contributions.format);
  }

  /**
   * Set the value of the attribute
   */
  set inputvalue(value: string) {
    this._value = this._value.set("inputvalue", value);

    if (value && value !== "") {
      if (this.validate(value)) {
        this.value = TimeUtil.toISO(value, this.format);
      }
    } else {
      this.value = null;
    }
  }

  /**
   * Get input value
   */
  getInputValue(): string {
    const inputvalue = this._value.get("inputvalue");

    return !inputvalue || inputvalue === null ? "" : inputvalue.toString();
  }

  /**
   * Get inputvalue
   */
  get inputvalue(): string {
    return this.getInputValue();
  }

  isTime(value: string) {
    return TimeUtil.hasFormat(value, this.format);
  }

  /**
   * Add time constraints
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    constraints.addConstraint(
      "Constraint.Time.InvalidFormat",
      this.isTime.bind(this),
      { format: this.format, value: this.inputvalue }
    );

    return constraints;
  }
}
