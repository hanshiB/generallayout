// @flow
import React from "react";
import classNames from "classnames";

import BreadcrumbItem from "beinformed/modules/Breadcrumb/BreadcrumbItem";
import BreadcrumbItemLink from "beinformed/modules/Breadcrumb/BreadcrumbItemLink";
import type ContextModel from "beinformed/models/context/ContextModel";
import type ContextItemModel from "beinformed/models/context/ContextItemModel";

type BreadcrumbType = {
  className?: string,
  items: ContextModel,
  onItemClick: (item: ContextItemModel) => void
};

/**
 * Render a breadcrumb
 */
const Breadcrumb = ({ className, items, onItemClick }: BreadcrumbType) => {
  const breadcrumbClass = classNames("breadcrumb", className);

  return (
    <ol className={breadcrumbClass}>
      {items.all.map((item, idx) => {
        if (idx < items.all.length - 1) {
          return (
            <BreadcrumbItemLink
              key={item.key + idx}
              item={item}
              onClick={onItemClick}
            />
          );
        }

        return <BreadcrumbItem key={item.key + idx} item={item} />;
      })}
    </ol>
  );
};

export default Breadcrumb;
