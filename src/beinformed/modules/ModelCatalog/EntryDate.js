// @flow
import React from "react";

import DatetimeInput from "beinformed/modules/FormInput/DatetimeInput";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import "./EntryDate.scss";

/**
 * Entry date for modelcatalog
 */
const EntryDate = ({
  entryDate,
  onChange
}: {
  entryDate: string,
  onChange: (date: string) => void
}) => (
  <DatetimeInput
    name={TIMEVERSION_FILTER_NAME}
    value={entryDate}
    onChange={date => onChange(date)}
  />
);

export default EntryDate;
