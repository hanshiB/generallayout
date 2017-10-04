// @flow
import React from "react";
import classNames from "classnames";

import { MULTI_ROW_TASK } from "beinformed/constants/LayoutHints";
import ListItemModel from "beinformed/models/list/ListItemModel";
import ListModel from "beinformed/models/list/ListModel";
import TableCellSelectable from "beinformed/modules/List/TableView/TableCellSelectable";
import { KEYCODES } from "beinformed/constants/Constants";
import type Href from "beinformed/models/href/Href";
type TableRowProps = {
  children?: any,
  item: ListItemModel,
  list: ListModel,
  onClick: (href: Href) => void
};

/**
 * Render an HTML table row
 */
const TableRow = ({ children, item, list, onClick }: TableRowProps) => {
  const tableRowsClass = classNames("table-row");

  /**
   * Makes a clone of the cell component and renders for each header item a cell.
   * By rendering each header cell we have a concistent table row, regardless of the contents of the row
   */
  const renderChildren = (headers, cellcomponent, listitem) =>
    headers.map(header =>
      React.cloneElement(React.Children.only(cellcomponent), {
        attribute: listitem.getAttributeByKey(header.key),
        key: `${item.id}--${header.key}`
      })
    );

  return (
    <div
      className={tableRowsClass}
      role="button"
      tabIndex="0"
      onClick={() => onClick(item.selfhref)}
      onKeyDown={e => {
        if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
          onClick(item.selfhref);
        }
      }}
    >
      {list.actionCollection.hasActionsByLayoutHint(MULTI_ROW_TASK) && (
        <TableCellSelectable key="headerSelectAll" item={item} />
      )}
      {renderChildren(list.headers, children, item)}
    </div>
  );
};

export default TableRow;
