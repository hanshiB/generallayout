// @flow
import React from "react";
import classNames from "classnames";

import AttributeList from "beinformed/modules/AttributeList/AttributeList";
import MultiRowTaskCheckboxContainer from "beinformed/modules/MultiRowTask/MultiRowTaskCheckboxContainer";
import type DetailModel from "beinformed/models/detail/DetailModel";
type ListItemProps = {
  isActive: boolean,
  isSelectable: boolean,
  item: DetailModel
};

/**
 * Render a list item
 */
const ListItem = ({ isActive, isSelectable, item }: ListItemProps) => {
  const itemClass = classNames("list-group-item", "list-item", {
    active: isActive
  });
  const titleAttribute = item.titleAttribute;
  const attributes = item.attributeCollection.all.filter(
    attribute =>
      attribute.type !== "image" && attribute.key !== titleAttribute.key
  );

  return (
    <div data-id={item.id} className={itemClass}>
      {isSelectable && <MultiRowTaskCheckboxContainer value={item.id} />}
      <div className="list-group-item-heading w-100 justify-content-between">
        {titleAttribute.readonlyvalue}
      </div>
      <AttributeList direction="horizontal" attributes={attributes} />
    </div>
  );
};

export default ListItem;
