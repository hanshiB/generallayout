// @flow
import React from "react";

import ListNoResults from "beinformed/modules/List/ListNoResults";
import type ListModel from "beinformed/models/list/ListModel";
import type Href from "beinformed/models/href/Href";

type ResultsProps = {
  className?: string,
  list: ListModel,
  viewType: string,
  availableViews: {
    type: string,
    icon: string,
    label: string,
    component: any
  }[],
  message: messageFunctionType,
  onItemClick: (href: Href) => void,
  onPageChange: (href: Href) => void,
  onPageSizeChange: (href: Href) => void,
  onSortChange: (href: Href) => void,
  onViewTypeChange: (value: string) => void
};

const ListResults = (props: ResultsProps) => {
  const activeView =
    props.availableViews.find(view => view.type === props.viewType) ||
    props.availableViews[0];
  const View = activeView.component;

  if (!View) {
    throw new Error(`View component not found for ${props.viewType}`);
  }

  if (props.list.hasResults()) {
    return <View {...props} />;
  }

  return <ListNoResults isSearch={props.list.resourcetype === "CaseSearch"} />;
};

export default ListResults;
