// @flow
import React from "react";

import { injectMessage } from "beinformed/modules/I18n/Message";
import DatepickerTimePartButton from "beinformed/modules/DatetimePicker/DatepickerTimePartButton";
import Icon from "beinformed/modules/Icon/Icon";

type DatepickerTimeSelectType = {
  time: string,
  message: messageFunctionType,
  onChange: (value: string) => void,
  onClick: (value: string) => void,
  onConfirm: (e: SyntheticEvent<*>) => void
};

/**
 * render
 */
const DatepickerTimeSelect = ({
  message,
  time,
  onChange,
  onClick,
  onConfirm
}: DatepickerTimeSelectType) => (
  <div className="datepicker-time-select">
    <DatepickerTimePartButton
      time={time}
      partName="hours"
      onChange={onChange}
      onClick={onClick}
    />
    <DatepickerTimePartButton
      time={time}
      partName="minutes"
      onChange={onChange}
      onClick={onClick}
    />
    <DatepickerTimePartButton
      time={time}
      partName="seconds"
      onChange={onChange}
      onClick={onClick}
    />
    <div className="datepicker-confirm">
      <div className="datepicker-content">
        <button
          className="btn btn-light"
          onClick={onConfirm}
          aria-label={message("DatetimePicker.useTime", "Use time")}
        >
          <Icon name="check" />
        </button>
      </div>
    </div>
  </div>
);

export default injectMessage(DatepickerTimeSelect);
