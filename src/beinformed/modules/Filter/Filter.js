// @flow
import React from "react";
import classNames from "classnames";

import AssignmentFilterModel from "beinformed/models/filters/AssignmentFilterModel";
import RangeFilterModel from "beinformed/models/filters/RangeFilterModel";
import RangeAttribute from "beinformed/modules/FormAttribute/RangeAttribute";
import FormAttribute from "beinformed/modules/FormAttribute/FormAttribute";
import AssignmentFilter from "beinformed/modules/Filter/AssignmentFilter";
import { PARAMETER_SEPARATOR } from "beinformed/constants/Constants";
import type FilterModel from "beinformed/models/filters/FilterModel";

type FilterProps = {
  className?: string,
  filter: FilterModel,
  stackedItemCount?: number,
  onChange: Function
};

/**
 * Render correct filter
 */
const Filter = ({
  className,
  filter,
  stackedItemCount,
  onChange
}: FilterProps) => {
  const filterClass = classNames(className, `${filter.type}filter`);

  if (filter instanceof AssignmentFilterModel) {
    return (
      <AssignmentFilter
        filter={filter}
        className={filterClass}
        onChange={onChange}
      />
    );
  }

  if (filter instanceof RangeFilterModel) {
    return (
      <RangeAttribute
        className={filterClass}
        id={filter.name}
        name={filter.name}
        namePrefix={filter.listkey + PARAMETER_SEPARATOR}
        attribute={filter.attribute}
        isFilter
        onChange={onChange}
      />
    );
  }

  return (
    <FormAttribute
      className={filterClass}
      id={filter.name}
      name={filter.name}
      attribute={filter.attribute}
      isFilter
      stacked
      stackedItemCount={stackedItemCount}
      onChange={onChange}
    />
  );
};

export default Filter;
