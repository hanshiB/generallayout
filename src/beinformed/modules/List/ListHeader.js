// @flow
import React from "react";
import classNames from "classnames";

import Breadcrumb from "beinformed/modules/Breadcrumb/Breadcrumb";
import FormattedText from "beinformed/modules/FormattedText/FormattedText";
import type ListModel from "beinformed/models/list/ListModel";
import type ContextItemModel from "beinformed/models/context/ContextItemModel";

type ListHeaderProps = {
  className?: string,
  list: ListModel,
  onContextItemClick?: (item: ContextItemModel) => void
};

/**
 * Render List list
 */
const ListHeader = ({
  className,
  list,
  onContextItemClick
}: ListHeaderProps) => {
  const listHeaderClass = classNames("list-header", className);

  return (
    <div className={listHeaderClass}>
      {list.context.hasContext() &&
        onContextItemClick && (
          <Breadcrumb items={list.context} onItemClick={onContextItemClick} />
        )}
      <h3 className="list-label">{list.label}</h3>
      {list.introtext && (
        <FormattedText className="introtext" text={list.introtext} />
      )}
    </div>
  );
};

export default ListHeader;
