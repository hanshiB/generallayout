// @flow
import React from "react";
import classNames from "classnames";

import ListModel from "beinformed/models/list/ListModel";
import TableRow from "beinformed/modules/List/TableView/TableRow";
import type Href from "beinformed/models/href/Href";

type TableRowsProps = {
  children?: any,
  list: ListModel,
  onItemClick: (href: Href) => void
};

/**
 * Render an HTML table rows
 */
const TableRows = ({ children, list, onItemClick }: TableRowsProps) => {
  const tableRowsClass = classNames("table-rows");

  return (
    <div className={tableRowsClass}>
      {list.listItemCollection.all.map(listitem => (
        <TableRow
          key={listitem.id}
          list={list}
          item={listitem}
          onClick={onItemClick}
        >
          {children}
        </TableRow>
      ))}
    </div>
  );
};

export default TableRows;
