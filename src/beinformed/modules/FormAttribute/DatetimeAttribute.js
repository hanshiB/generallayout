// @flow
import React from "react";
import classNames from "classnames";

import AddOnButton from "beinformed/modules/Button/AddOnButton";
import DatetimeInput from "beinformed/modules/FormInput/DatetimeInput";
import FormAssistant from "beinformed/modules/FormAssistant/FormAssistant";
import FormLabel from "beinformed/modules/FormLabel/FormLabel";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";
import { Message } from "beinformed/modules/I18n/Message";
import DateAttributeModel from "beinformed/models/attributes/DateAttributeModel";
import Icon from "beinformed/modules/Icon/Icon";
import type TimeAttributeModel from "beinformed/models/attributes/TimeAttributeModel";
import type TimestampAttributeModel from "beinformed/models/attributes/TimestampAttributeModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type DatetimeAttributeProps = {
  attribute: DateAttributeModel | TimeAttributeModel | TimestampAttributeModel,
  className?: string,
  questionContentConfiguration?: ContentConfigurationElements,
  id: string,
  isFilter?: boolean,
  name: string,
  formLayout?: "vertical" | "horizontal",
  onChange: (
    attribute:
      | DateAttributeModel
      | TimeAttributeModel
      | TimestampAttributeModel,
    value: string
  ) => void,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render date, time or datetime form group
 */
const DatetimeAttribute = ({
  attribute,
  className,
  questionContentConfiguration,
  name,
  id,
  isFilter,
  formLayout,
  onChange,
  onBlur,
  onFocus
}: DatetimeAttributeProps) => {
  const groupClass = classNames("form-group row", className, {
    "has-danger": attribute.inError(),
    datewidget: attribute.type === "date",
    timewidget: attribute.type === "time",
    timestampwidget: attribute.type === "timestamp"
  });

  const mindate =
    attribute instanceof DateAttributeModel ? attribute.mindate : null;
  const maxdate =
    attribute instanceof DateAttributeModel ? attribute.maxdate : null;

  return (
    <div className={groupClass} data-name={name}>
      <FormLabel
        htmlFor={id || name}
        defaultLabel={attribute.label}
        concept={attribute.concept}
        content={attribute.content}
        contentConfiguration={questionContentConfiguration}
        isMandatory={attribute.mandatory}
        formLayout={formLayout}
      />
      <div className="col">
        <DatetimeInput
          name={name}
          id={id}
          value={attribute.inputvalue}
          mindate={mindate}
          maxdate={maxdate}
          format={attribute.format}
          placeholder={
            attribute.placeholder === ""
              ? attribute.formatLabel
              : attribute.placeholder
          }
          inError={attribute.inError()}
          readOnly={attribute.readonly}
          layouthint={attribute.layouthint}
          onChange={inputvalue => onChange(attribute, inputvalue)}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          {isFilter && (
            <AddOnButton className="filter-button">
              <Icon name="filter" textAfter />
              <Message
                id="FilterButton.Label"
                defaultMessage="Filter"
                screenreaderOnly
              />
            </AddOnButton>
          )}
        </DatetimeInput>
        {(attribute.assistantMessage ||
          attribute.constraintCollection.hasItems) && (
          <FormAssistant
            assistantMessage={attribute.assistantMessage}
            constraints={attribute.constraintCollection}
            errors={attribute.errorCollection}
            value={attribute.inputvalue}
          />
        )}
        <FormContentRenderer
          concept={attribute.concept}
          contentConfiguration={questionContentConfiguration}
        />
      </div>
    </div>
  );
};

export default DatetimeAttribute;
