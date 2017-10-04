// @flow
import React from "react";

import { injectMessage, Message } from "beinformed/modules/I18n/Message";
import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";
import AddOnButton from "beinformed/modules/Button/AddOnButton";
import Icon from "beinformed/modules/Icon/Icon";
import DatetimeInput from "beinformed/modules/FormInput/DatetimeInput";
import SelectInput from "beinformed/modules/FormInput/SelectInput";
import TextInput from "beinformed/modules/FormInput/TextInput";

import "./QuickSearchInput.scss";

import type FilterModel from "beinformed/models/filters/FilterModel";

type QuickSearchInputProps = {
  message: messageFunctionType,
  searchOption: FilterModel,
  value: string,
  onChange: (value: string) => void
};

/**
 * Render quick search input
 */
const QuickSearchInput = ({
  message,
  searchOption,
  value,
  onChange
}: QuickSearchInputProps) => {
  const SearchInput =
    searchOption.type === "datefilter" ? DatetimeInput : TextInput;

  const placeHolderText = message(
    "QuickSearchInput.Placeholder",
    "Search by {SEARCHOPTION_LABEL}",
    {
      SEARCHOPTION_LABEL: searchOption.label
    }
  );

  if (searchOption.attribute instanceof ChoiceAttributeModel) {
    return (
      <SelectInput
        className="quicksearch-input"
        name={searchOption.attribute.name}
        options={searchOption.attribute.options.all.map(option => {
          const newOption = option;

          newOption.selected = option.code === value;

          return newOption;
        })}
        ariaLabel={placeHolderText}
        placeholder={placeHolderText}
        onChange={onChange}
      >
        <AddOnButton className="btn-quick-search">
          <Icon name="search" textAfter />
          <Message
            id="QuickSearchInput.SearchLabel"
            defaultMessage="Search"
            screenreaderOnly
          />
        </AddOnButton>
      </SelectInput>
    );
  }

  return (
    <SearchInput
      className="quicksearch-input"
      name={searchOption.attribute.name}
      value={value}
      inError={searchOption.attribute.inError()}
      ariaLabel={placeHolderText}
      placeholder={placeHolderText}
      autoComplete="off"
      onChange={onChange}
    >
      <AddOnButton className="btn-quick-search">
        <Icon name="search" textAfter />
        <Message
          id="QuickSearchInput.SearchLabel"
          defaultMessage="Search"
          screenreaderOnly
        />
      </AddOnButton>
    </SearchInput>
  );
};

export default injectMessage(QuickSearchInput);
