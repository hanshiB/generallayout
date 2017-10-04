// @flow
import React from "react";
import classNames from "classnames";

import AttributeModel from "beinformed/models/attributes/AttributeModel";
import AttributeValue from "beinformed/modules/AttributeList/AttributeValue";

type TableCellProps = {
  attribute?: AttributeModel,
  className?: string,
  minWidth?: number,
  width?: string
};

/**
 * Render an HTML table cell
 */
const TableCell = ({
  attribute,
  className,
  minWidth,
  width
}: TableCellProps) => {
  const tableHeadClass = classNames("table-cell", className);
  const cellStyle = {
    minWidth,
    width
  };

  return (
    <div className={tableHeadClass} style={cellStyle}>
      <AttributeValue attribute={attribute} />
    </div>
  );
};

export default TableCell;
