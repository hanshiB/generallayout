// @flow
import React from "react";
import classNames from "classnames";

import DetailModel from "beinformed/models/detail/DetailModel";
import MultiRowTaskCheckboxContainer from "beinformed/modules/MultiRowTask/MultiRowTaskCheckboxContainer";

type TableCellSelectableProps = {
  className?: string,
  item: DetailModel,
  minWidth?: number,
  width?: string
};

/**
 * Render an HTML table
 */
const TableCellSelectable = ({
  className,
  item,
  minWidth,
  width
}: TableCellSelectableProps) => {
  const tableHeadClass = classNames("table-cell", className);
  const cellStyle = {
    minWidth,
    width
  };

  return (
    <div className={tableHeadClass} style={cellStyle}>
      <MultiRowTaskCheckboxContainer value={item.id} />
    </div>
  );
};

export default TableCellSelectable;
