// @flow
import React from "react";
import classNames from "classnames";

import ListItem from "beinformed/modules/List/ListView/ListItem";
import ListItemLink from "beinformed/modules/List/ListView/ListItemLink";
import { MULTI_ROW_TASK } from "beinformed/constants/LayoutHints";
import Href from "beinformed/models/href/Href";
import type ListModel from "beinformed/models/list/ListModel";

type ViewProps = {
  className?: string,
  list: ListModel,
  onItemClick: (href: Href) => void
};

/**
 * Render HTML list
 */
const ListView = ({ className, list, onItemClick }: ViewProps) => {
  const listClass = classNames("list-group", className);

  return (
    <div className={listClass}>
      {list.listItemCollection.all.map(item => {
        const isActive = list.detail !== null && list.detail.id === item.id;
        if (item.selfhref === null || item.selfhref.equals(new Href("#"))) {
          return (
            <ListItem
              item={item}
              key={`${list.key}-${item.id}`}
              isActive={isActive}
              isSelectable={list.actionCollection.hasActionsByLayoutHint(
                MULTI_ROW_TASK
              )}
            />
          );
        }

        return (
          <ListItemLink
            item={item}
            key={`${list.key}-${item.id}`}
            onClick={onItemClick}
            isActive={isActive}
            isSelectable={list.actionCollection.hasActionsByLayoutHint(
              MULTI_ROW_TASK
            )}
          />
        );
      })}
    </div>
  );
};

export default ListView;
