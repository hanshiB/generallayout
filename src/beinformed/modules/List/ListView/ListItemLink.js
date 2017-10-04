// @flow
import React from "react";
import classNames from "classnames";

import DetailModel from "beinformed/models/detail/DetailModel";
import AttributeList from "beinformed/modules/AttributeList/AttributeList";
import Link from "beinformed/modules/Link/Link";
import MultiRowTaskCheckboxContainer from "beinformed/modules/MultiRowTask/MultiRowTaskCheckboxContainer";
import { KEYCODES } from "beinformed/constants/Constants";

import "./ListItemLink.scss";

import type Href from "beinformed/models/href/Href";

type ListItemLinkProps = {
  isActive: boolean,
  isSelectable: boolean,
  item: DetailModel,
  onClick: (href: Href) => void
};

/**
 * Render a list item link
 */
const ListItemLink = ({
  isActive,
  isSelectable,
  item,
  onClick
}: ListItemLinkProps) => {
  const itemClass = classNames("list-group-item", "list-group-item-action", {
    active: isActive
  });
  const titleAttribute = item.titleAttribute;

  const attributes = item.attributeCollection.all.filter(
    attribute =>
      attribute.type !== "image" && attribute.key !== titleAttribute.key
  );

  return (
    <div
      className={itemClass}
      data-id={item.id}
      onClick={() => onClick(item.selfhref)}
      onKeyDown={e => {
        if (
          onClick &&
          (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE)
        ) {
          onClick(item.selfhref);
        }
      }}
      role="button"
      tabIndex="0"
    >
      <div className="list-group-item-heading w-100 justify-content-between">
        {isSelectable && <MultiRowTaskCheckboxContainer value={item.id} />}
        <Link
          className={classNames({
            "text-right": titleAttribute.alignment === "right",
            "text-center": titleAttribute.alignment === "center"
          })}
          href={item.selfhref}
          onClick={onClick}
        >
          {titleAttribute.value}
        </Link>
      </div>
      <AttributeList direction="horizontal" attributes={attributes} />
    </div>
  );
};

export default ListItemLink;
