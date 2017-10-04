// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";

import InputAddOn from "beinformed/modules/FormInput/InputAddOn";
import InputGroup from "beinformed/modules/FormInput/InputGroup";

import type LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

type TextInputProps = {
  ariaLabel?: string,
  ariaLabelledBy?: string,
  autoComplete?: "on" | "off" | "new-password",
  children?: any,
  className?: string,
  disabled?: boolean,
  id?: string,
  inError?: boolean,
  name: string,
  placeholder?: string,
  postfix?: string,
  prefix?: string,
  readOnly?: boolean,
  type: string,
  value: string,
  autoFocus?: boolean,
  layouthint?: LayoutHintCollection,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<*>) => void,
  onKeyUp?: (e: SyntheticKeyboardEvent<*>) => void
};

/**
 * Render default text input
 */
class TextInput extends PureComponent<TextInputProps> {
  _input: ?HTMLInputElement;

  static defaultProps = {
    type: "text",
    value: "",
    readOnly: false,
    disabled: false
  };

  /**
   * Set focus on input
   */
  focus() {
    setTimeout(() => {
      if (this._input) {
        this._input.focus();
      }
    }, 1);
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }
  render() {
    const {
      className,
      inError,
      ariaLabel,
      ariaLabelledBy,
      prefix,
      postfix,
      children,
      readOnly,

      autoComplete,
      disabled,
      name,
      placeholder,
      type,
      value,
      autoFocus,

      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onKeyUp
    } = this.props;

    const inputClass = classNames("form-control", className, {
      "form-control-danger": inError
    });

    const groupClass = className
      ? classNames({ [`${className}-group`]: className })
      : "";

    const id = this.props.id || name;

    return (
      <InputGroup readonly={readOnly} className={groupClass}>
        {prefix && <InputAddOn>{prefix}</InputAddOn>}
        <input
          ref={c => {
            this._input = c;
          }}
          className={inputClass}
          id={id}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabel ? null : ariaLabelledBy || `${id}-label`}
          readOnly={readOnly}
          autoComplete={autoComplete}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          autoFocus={autoFocus}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onChange={e => onChange(e.target.value)}
        />
        {postfix && <InputAddOn>{postfix}</InputAddOn>}
        {children}
      </InputGroup>
    );
  }
}

export default TextInput;
