// @flow
import React from "react";

import Link from "beinformed/modules/Link/Link";
import type ContextItemModel from "beinformed/models/context/ContextItemModel";

type BreadcrumbItemLinkType = {
  item: ContextItemModel,
  onClick: (item: ContextItemModel) => void
};

/**
 * Render an item on the breadcrumb
 */
const BreadcrumbItemLink = ({ item, onClick }: BreadcrumbItemLinkType) => (
  <li className="breadcrumb-item" data-id={item.key}>
    <Link href={item.href} onClick={() => onClick(item)}>
      {item.label}
    </Link>
  </li>
);

export default BreadcrumbItemLink;
