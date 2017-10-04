// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { POPUP } from "beinformed/constants/LayoutHints";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";
import IconPopover from "beinformed/modules/Popover/IconPopover";
import { injectMessage } from "beinformed/modules/I18n/Message";
import { getChoiceOptionLabel } from "beinformed/modules/FormInput/_util";
import CheckboxInput from "beinformed/modules/FormInput/CheckboxInput";
import RadioInput from "beinformed/modules/FormInput/RadioInput";

import "./ChoiceInputGroup.scss";

import type ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
import type LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

type ChoiceInputGroupProps = {
  className?: string,
  disabled?: boolean,
  id: string,
  label: string,
  message: messageFunctionType,
  name: string,
  optionContentConfiguration: ContentConfigurationElements,
  options: ChoiceAttributeOptionModel[],
  readOnly?: boolean,
  stacked?: boolean,
  stackedItemCount?: number,
  type: "checkbox" | "radiobutton",
  layouthint?: LayoutHintCollection,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onClick?: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render a group of toggle items, radio or checkbox without children
 */
class ChoiceInputGroup extends Component<ChoiceInputGroupProps> {
  getBooleanOptionLabel(option) {
    return this.props.message(
      `ChoiceInputBooleanOption.${option.code}`,
      option.label
    );
  }

  render() {
    const {
      className,
      optionContentConfiguration,
      disabled,
      id,
      label,
      name,
      options,
      readOnly,
      stacked,
      stackedItemCount,
      type,
      layouthint,
      onBlur,
      onClick,
      onChange,
      onFocus
    } = this.props;

    const choiceClass = classNames({
      "custom-controls-stacked":
        stacked && (type === "checkbox" || type === "radiobutton")
    });

    const ChoiceInputType = type === "radiobutton" ? RadioInput : CheckboxInput;

    const stackedGroups = [];

    if (stackedItemCount) {
      for (let i = 0; i < options.length; i += stackedItemCount) {
        stackedGroups.push(options.slice(i, i + stackedItemCount));
      }
    } else {
      stackedGroups.push(options);
    }

    return (
      <div className={className} role="group" aria-label={label}>
        {stackedGroups.map((stackGroup, s) => (
          <div key={`stack-${s}`} className={choiceClass}>
            {stackGroup.map((option, i) => (
              <span
                key={i}
                className={classNames("option", { active: option.selected })}
              >
                <ChoiceInputType
                  name={name}
                  id={id}
                  label={
                    option.isBooleanType
                      ? this.getBooleanOptionLabel(option)
                      : getChoiceOptionLabel(option, optionContentConfiguration)
                  }
                  value={option.code}
                  isChecked={option.selected}
                  disabled={disabled || readOnly}
                  layouthint={layouthint}
                  onChange={onChange}
                  onBlur={onBlur}
                  onClick={onClick}
                  onFocus={onFocus}
                  count={option.count}
                />
                {optionContentConfiguration &&
                  optionContentConfiguration.hasLayoutHint(POPUP) && (
                    <IconPopover>
                      <FormContentRenderer
                        concept={option.concept}
                        contentConfiguration={optionContentConfiguration.includeLayoutHints(
                          [POPUP]
                        )}
                      />
                    </IconPopover>
                  )}

                {optionContentConfiguration && (
                  <FormContentRenderer
                    concept={option.concept}
                    contentConfiguration={optionContentConfiguration.excludeLayoutHints(
                      [POPUP]
                    )}
                  />
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default injectMessage(ChoiceInputGroup);
