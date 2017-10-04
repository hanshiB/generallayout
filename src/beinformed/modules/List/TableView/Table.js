// @flow
import React from "react";
import classNames from "classnames";

import TableHeadCell from "beinformed/modules/List/TableView/TableHeadCell";
import TableCell from "beinformed/modules/List/TableView/TableCell";
import TableHead from "beinformed/modules/List/TableView/TableHead";
import TableRows from "beinformed/modules/List/TableView/TableRows";

import "./Table.scss";

import type ListModel from "beinformed/models/list/ListModel";
import type Href from "beinformed/models/href/Href";

type ViewProps = {
  className?: string,
  list: ListModel,
  onItemClick: (href: Href) => void
};

/**
 * Render an HTML table
 */
const Table = ({ className, list, onItemClick }: ViewProps) => {
  const tableClass = classNames("table", className);
  const TABLE_WIDTH_PERCENTAGE = 100;
  const TABLE_MIN_CELL_WIDTH = 125;
  const TABLE_BORDER_WIDTH = 2;
  const tableCellWidth = TABLE_WIDTH_PERCENTAGE / list.headers.length;
  const tableStyle = {
    minWidth: list.headers.length * TABLE_MIN_CELL_WIDTH + TABLE_BORDER_WIDTH
  };

  return (
    <div className="tablewrapper">
      <div className={tableClass} style={tableStyle}>
        <TableHead list={list}>
          <TableHeadCell key="headercell" width={`${tableCellWidth}%`} />
        </TableHead>
        <TableRows list={list} onItemClick={onItemClick}>
          <TableCell
            key="bodycell"
            width={`${tableCellWidth}%`}
            minWidth={TABLE_MIN_CELL_WIDTH}
          />
        </TableRows>
      </div>
    </div>
  );
};

export default Table;
