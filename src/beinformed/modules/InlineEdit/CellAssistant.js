// @flow
import React from "react";

import Popover from "beinformed/modules/Popover/Popover";
import FormAssistant from "beinformed/modules/FormAssistant/FormAssistant";
import type ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import type ErrorCollection from "beinformed/models/error/ErrorCollection";

type CellAssistantProps = {
  assistantMessage: string | null,
  constraints: ConstraintCollection,
  errors: ErrorCollection,
  value: string
};

/**
 * Render widget assistant message
 */
const CellAssistant = ({
  assistantMessage,
  constraints,
  errors,
  value
}: CellAssistantProps) => (
  <Popover className="cell-assistant" alignment="bottom center">
    <FormAssistant
      assistantMessage={assistantMessage}
      constraints={constraints}
      errors={errors}
      value={value}
    />
  </Popover>
);

export default CellAssistant;
