// @flow
import React from "react";
import classNames from "classnames";

import XMLAttributeModel from "beinformed/models/attributes/XMLAttributeModel";
import TextareaInput from "beinformed/modules/FormInput/TextareaInput";
import WysiwygInput from "beinformed/modules/FormInput/WysiwygInput";
import CellAssistant from "beinformed/modules/InlineEdit/CellAssistant";

type InlineEditXMLCellProps = {
  attribute: XMLAttributeModel,
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
const InlineEditXMLCell = ({
  className,
  attribute,
  name,
  id,
  hasFocus,
  onBlur,
  onChange,
  onFocus
}: InlineEditXMLCellProps) => {
  const widgetClass = classNames("form-group", className, {
    "has-danger": attribute.inError(),
    xmlwidget: attribute instanceof XMLAttributeModel
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

export default InlineEditXMLCell;
