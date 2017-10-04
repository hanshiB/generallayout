// @flow
import React, { Component } from "react";

import AddOnButton from "beinformed/modules/Button/AddOnButton";
import DatetimePicker from "beinformed/modules/DatetimePicker/DatetimePicker";
import TextInput from "beinformed/modules/FormInput/TextInput";
import Icon from "beinformed/modules/Icon/Icon";
import { ISO_DATE_FORMAT } from "beinformed/constants/Constants";
import { Message } from "beinformed/modules/I18n/Message";

import type LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

import "./DatetimeInput.scss";

type DatetimeInputProps = {
  ariaLabel?: string,
  ariaLabelledBy?: string,
  children?: any,
  className?: string,
  disabled?: boolean,
  format: string,
  id?: string,
  inError?: boolean,
  maxdate?: string | null,
  mindate?: string | null,
  name: string,
  placeholder?: string,
  readOnly?: boolean,
  value: string,
  layouthint?: LayoutHintCollection,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

type DatetimeInputState = {
  showDateTimePicker: boolean
};

/**
 * Render date time input
 */
class DatetimeInput extends Component<DatetimeInputProps, DatetimeInputState> {
  _clickOnPicker: boolean;
  _datetimePicker: ?DatetimePicker;
  _input: ?TextInput;

  static defaultProps = {
    value: "",
    format: ISO_DATE_FORMAT
  };

  /**
   * Construct
   */
  constructor(props: DatetimeInputProps) {
    super(props);

    this.state = {
      showDateTimePicker: false
    };

    this._clickOnPicker = false;
  }

  /**
   * componentWillUnmount, removes document wide click event observer
   */
  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  }

  handleDocumentClick = () => {
    if (this._clickOnPicker) {
      this._clickOnPicker = false;

      return;
    }

    this.setState({
      showDateTimePicker: false
    });

    document.removeEventListener("click", this.handleDocumentClick);
  };

  /**
   * Display the datetimepicker
   */
  handleDatePickerButtonClick = (e: SyntheticEvent<*>) => {
    e.preventDefault();

    this.setState({
      showDateTimePicker: !this.state.showDateTimePicker
    });

    document.addEventListener("click", this.handleDocumentClick, false);
  };

  /**
   * Process a date change and hide datetimepicker
   */
  handleDateSelect = (date: string) => {
    this.props.onChange(date);

    this.setState({
      showDateTimePicker: false
    });
    document.removeEventListener("click", this.handleDocumentClick);

    if (this._input) {
      this._input.focus();
    }
  };

  /**
   * Process a date change through the input element
   */
  handleChange = (inputvalue: string) => {
    this.handleDateSelect(inputvalue);
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const hasTime = /[Hms]/g.test(this.props.format);
    const hasDate = /[YMD]/g.test(this.props.format);

    const { mindate, maxdate, ...props } = this.props;

    const hasDatetimePicker = !this.props.readOnly && (hasDate || hasTime);

    return (
      <TextInput
        ref={c => {
          this._input = c;
        }}
        {...props}
        onChange={this.handleChange}
      >
        {hasDatetimePicker && (
          <AddOnButton
            className="date-button"
            type="button"
            onClick={this.handleDatePickerButtonClick}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          >
            <Icon name={hasDate ? "calendar" : "clock-o"} />
            <Message
              id="DateTimeInput.ButtonLabel"
              defaultLabel="Pick a date"
              screenreaderOnly
            />
          </AddOnButton>
        )}

        {hasDatetimePicker &&
          this.state.showDateTimePicker && (
            <DatetimePicker
              ref={c => {
                this._datetimePicker = c;
              }}
              date={this.props.value}
              mindate={mindate}
              maxdate={maxdate}
              format={this.props.format}
              onClick={() => {
                this._clickOnPicker = true;
              }}
              onSelect={inputvalue => this.handleDateSelect(inputvalue || "")}
            />
          )}

        {this.props.children}
      </TextInput>
    );
  }
}

export default DatetimeInput;
