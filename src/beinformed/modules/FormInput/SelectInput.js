// @flow
import React, { Component } from "react";
import classNames from "classnames";

import InputGroup from "beinformed/modules/FormInput/InputGroup";
import Dropdown from "beinformed/modules/Dropdown/Dropdown";
import DropdownToggle from "beinformed/modules/Dropdown/DropdownToggle";
import DropdownChildren from "beinformed/modules/Dropdown/DropdownChildren";
import DropdownItem from "beinformed/modules/Dropdown/DropdownItem";
import LookupInputActiveOption from "beinformed/modules/FormInput/LookupInputActiveOption";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";
import { injectMessage } from "beinformed/modules/I18n/Message";
import { getChoiceOptionLabel } from "beinformed/modules/FormInput/_util";
import type ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

import "./SelectInput.scss";

type SelectInputProps = {
  children?: any,
  className?: string,
  disabled?: boolean,
  id?: string,
  name: string,
  optionContentConfiguration?: ContentConfigurationElements,
  options: ChoiceAttributeOptionModel[],
  placeholder?: string,
  readOnly?: boolean,
  message: messageFunctionType,
  onChange: (value: string) => void
};

/**
 * Render a html select
 */
class SelectInput extends Component<SelectInputProps> {
  /**
   * Flaten option array to a single level array (in case there are children present)
   */
  flattenOptions(options: ChoiceAttributeOptionModel[], level: number = 0) {
    const opts = [];

    options.forEach(option => {
      const newOption = option.clone();

      newOption.level = level;

      opts.push(newOption);
      if (newOption.children) {
        const flatten = this.flattenOptions(newOption.children.all, level + 1);

        opts.push(...flatten);
      }
    });

    return opts;
  }

  renderActiveOptions(value: string, options: ChoiceAttributeOptionModel[]) {
    const placeholder =
      this.props.placeholder === ""
        ? this.props.message("SelectField.Placeholder", "Choose an option")
        : this.props.placeholder;

    if (value.length === 0) {
      return placeholder;
    }

    return options
      .filter(option => option.selected)
      .map(option => (
        <LookupInputActiveOption
          key={option.code}
          option={option}
          onClick={() => this.props.onChange(option.code)}
          readOnly={this.props.readOnly}
          disabled={this.props.disabled}
          optionContentConfiguration={this.props.optionContentConfiguration}
        />
      ));
  }

  renderOptions(options: ChoiceAttributeOptionModel[]) {
    return options.map(option => {
      const isSelected =
        !option.selected || option.selected === null ? false : option.selected;
      return (
        <DropdownItem
          key={option.code}
          value={option.code}
          selected={isSelected}
          style={{ paddingLeft: `${option.level + 1}em` }}
          onClick={() => this.props.onChange(option.code)}
        >
          <span className="header">
            {getChoiceOptionLabel(
              option,
              this.props.optionContentConfiguration
            )}
          </span>
          <FormContentRenderer
            concept={option.concept}
            contentConfiguration={this.props.optionContentConfiguration}
          />
        </DropdownItem>
      );
    });
  }

  /**
   * Render
   */
  render() {
    const options = this.flattenOptions(this.props.options);
    const value = options
      .filter(option => option.selected)
      .map(option => option.code)
      .join(",");

    const id = this.props.id || this.props.name;

    const selectClass = classNames("select-field", this.props.className, {
      disabled: this.props.disabled,
      readonly: this.props.readOnly
    });

    return (
      <InputGroup>
        <Dropdown className={selectClass} activeValue={value}>
          <DropdownToggle className="btn-light" id={id}>
            {this.renderActiveOptions(value, options)}
          </DropdownToggle>
          <DropdownChildren>{this.renderOptions(options)}</DropdownChildren>
        </Dropdown>
        {this.props.children}
      </InputGroup>
    );
  }
}

export default injectMessage(SelectInput);
