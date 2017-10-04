// @flow
import React from "react";

import type ContextItemModel from "beinformed/models/context/ContextItemModel";

/**
 * Render an item on the breadcrumb
 */
const BreadcrumbItem = ({ item }: { item: ContextItemModel }) => (
  <li className="breadcrumb-item" data-id={item.key}>
    {item.label}
  </li>
);

export default BreadcrumbItem;
