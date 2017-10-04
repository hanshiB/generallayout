// @flow
import React from "react";
import classNames from "classnames";

import List from "beinformed/modules/List/List";
import Panel from "beinformed/modules/Panel/Panel";
import PanelBody from "beinformed/modules/Panel/PanelBody";

import "./ListPanel.scss";

import type ListModel from "beinformed/models/list/ListModel";
import type Href from "beinformed/models/href/Href";
import type ContextItemModel from "beinformed/models/context/ContextItemModel";

type ListPanelProps = {
  isTab: boolean,
  isActive: boolean,
  className?: string,
  keepPanelsInView?: boolean,
  list: ListModel,
  parameter?: string,
  viewType?: string,
  onContextItemClick?: (contextitem: ContextItemModel) => void,
  onFilterChange?: (
    list: ListModel,
    attribute: AttributeType,
    value: string
  ) => void,
  onFilterReset?: (list: ListModel) => void,
  onFilterSubmit?: (list: ListModel) => void,
  onItemClick?: (list: ListModel, href: Href) => void,
  onOpenCase?: (href: Href) => void,
  onPageChange?: (href: Href) => void,
  onPageSizeChange?: (href: Href) => void,
  onSortChange?: (href: Href) => void
};

/**
 * Render ListPanel
 */
const ListPanel = (props: ListPanelProps) => {
  const panelClass = classNames("listpanel", props.className, {
    "tab-pane": props.isTab,
    active: props.isActive
  });

  return (
    <Panel dataId={props.list.key} className={panelClass}>
      <PanelBody>
        <List {...props} />
      </PanelBody>
    </Panel>
  );
};

export default ListPanel;
