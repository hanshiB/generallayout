// @flow
import React from "react";
import classNames from "classnames";

import MemoAttributeModel from "beinformed/models/attributes/MemoAttributeModel";
import TextareaInput from "beinformed/modules/FormInput/TextareaInput";
import WysiwygInput from "beinformed/modules/FormInput/WysiwygInput";
import CellAssistant from "beinformed/modules/InlineEdit/CellAssistant";

type InlineEditMemoCellProps = {
  attribute: MemoAttributeModel,
  className?: string,
  hasFocus?: boolean,
  id: string,
  name: string,
  onBlur: Function,
  onChange: Function,
  onFocus: Function
};

/**
 * Render inline memo cell
 */
const InlineEditMemoCell = ({
  className,
  attribute,
  name,
  id,
  hasFocus,
  onBlur,
  onChange,
  onFocus
}: InlineEditMemoCellProps) => {
  const widgetClass = classNames("form-group", className, {
    "has-danger": attribute.inError(),
    memowidget: attribute instanceof MemoAttributeModel
  });

  const MemoInput = attribute.formatted ? WysiwygInput : TextareaInput;

  return (
    <div className={widgetClass} data-name={name}>
      <MemoInput
        name={name}
        id={id}
        value={attribute.inputvalue}
        ariaLabel={attribute.label}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        inError={attribute.inError()}
        readOnly={attribute.readonly}
      />
      {hasFocus &&
        (attribute.assistantMessage ||
          attribute.constraintCollection.hasItems) && (
          <CellAssistant
            assistantMessage={attribute.assistantMessage}
            constraints={attribute.constraintCollection}
            errors={attribute.errorCollection}
            value={attribute.inputvalue}
          />
        )}
    </div>
  );
};

export default InlineEditMemoCell;
