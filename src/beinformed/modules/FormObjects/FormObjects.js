// @flow
import React from "react";
import classNames from "classnames";

import FormObject from "beinformed/modules/FormObjects/FormObject";
import type FormObjectCollection from "beinformed/models/form/FormObjectCollection";

type FormObjectsProps = {
  className: string,
  objects: FormObjectCollection,
  id: string,
  formLayout?: "vertical" | "horizontal",
  onAttributeChange: Function,
  onAttributeBlur?: Function,
  onAttributeClick?: Function,
  onAttributeFocus?: Function
};

/**
 * Render form objects of a form
 */
const FormObjects = ({
  className,
  objects,
  id,
  formLayout,
  onAttributeChange,
  onAttributeBlur,
  onAttributeClick,
  onAttributeFocus
}: FormObjectsProps) => (
  <div className={classNames("form-objects", className)}>
    {objects.all.map(obj => (
      <FormObject
        key={`${id}-${obj.key}`}
        id={`${id}-${obj.key}`}
        object={obj}
        formLayout={formLayout}
        onAttributeChange={onAttributeChange}
        onAttributeBlur={onAttributeBlur}
        onAttributeClick={onAttributeClick}
        onAttributeFocus={onAttributeFocus}
      />
    ))}
  </div>
);

export default FormObjects;
