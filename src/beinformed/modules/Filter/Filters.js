// @flow
import React from "react";
import classNames from "classnames";

import { Message } from "beinformed/modules/I18n/Message";
import HTMLForm from "beinformed/modules/Form/HTMLForm";
import KeepInView from "beinformed/modules/KeepInView/KeepInView";
import Filter from "beinformed/modules/Filter/Filter";
import Link from "beinformed/modules/Link/Link";
import Icon from "beinformed/modules/Icon/Icon";

import "./Filters.scss";

import type Href from "beinformed/models/href/Href";
import type FilterCollection from "beinformed/models/filters/FilterCollection";

type FiltersProps = {
  className?: string,
  filterCollection: FilterCollection,
  keepInView?: boolean,
  listHref: Href,
  onFilterChange: Function,
  onReset: Function,
  onSubmit: Function
};

/**
 * Render filters
 */
const Filters = ({
  className,
  filterCollection,
  keepInView,
  listHref,
  onReset,
  onSubmit,
  onFilterChange
}: FiltersProps) => {
  const filtersClass = classNames("filters", className);

  return (
    <KeepInView className={filtersClass} enabled={keepInView}>
      <div className="text-right">
        <Link href={listHref} onClick={onReset}>
          <Icon name="refresh" className="px-0" />{" "}
          <Message id="Filters.Button.ClearAll" defaultMessage="Clear all" />
        </Link>
      </div>
      <HTMLForm
        method="get"
        name="filters"
        action={listHref}
        onSubmit={onSubmit}
      >
        {filterCollection.all.map((filter, idx) => (
          <Filter
            key={`${filter.name}-${idx}`}
            filter={filter}
            onChange={(attribute, inputvalue) => {
              onFilterChange(attribute, inputvalue);
            }}
            onSubmit={onSubmit}
          />
        ))}
      </HTMLForm>
    </KeepInView>
  );
};

export default Filters;
