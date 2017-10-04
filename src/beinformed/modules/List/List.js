// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { SHOW_ONE_RESULT_AS_DETAIL } from "beinformed/constants/LayoutHints";
import EditableListModel from "beinformed/models/list/EditableListModel";
import InlineEditContainer from "beinformed/modules/InlineEdit/InlineEditContainer";
import Filters from "beinformed/modules/Filter/Filters";
import ListDetail from "beinformed/modules/ListDetail/ListDetail";
import ListMain from "beinformed/modules/List/ListMain";
import ListHeader from "beinformed/modules/List/ListHeader";
import ListView from "beinformed/modules/List/ListView/List";
import TableView from "beinformed/modules/List/TableView/Table";
import type ListModel from "beinformed/models/list/ListModel";
import type Href from "beinformed/models/href/Href";
import type ContextItemModel from "beinformed/models/context/ContextItemModel";

export type ListProps = {
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
  onItemClick: (list: ListModel, href: Href) => void,
  onOpenCase?: (href: Href) => void,
  onPageChange?: (href: Href) => void,
  onPageSizeChange?: (href: Href) => void,
  onSortChange?: (href: Href) => void
};

type ListState = {
  viewType: string
};

/**
 * Render a list
 */
class List extends Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);

    this.state = {
      viewType: "ListView"
    };
  }

  getAvailableViews() {
    const views = [
      {
        icon: "list",
        label: "list",
        type: "ListView",
        component: ListView
      },
      {
        icon: "table",
        label: "table",
        type: "TableView",
        component: TableView
      }
    ];

    if (this.props.list instanceof EditableListModel) {
      views.push({
        icon: "pencil",
        label: "editable table",
        type: "EditableTableView",
        component: InlineEditContainer
      });
    }

    return views;
  }

  render() {
    // this is arbitrary, but when a list has many attributes on the list,
    // than make more room for them by creating a smaller detail
    const SMALL_AMOUNT_OF_COLUMNS_NUMBER = 4;
    const largeDetail =
      this.props.list.headers.length < SMALL_AMOUNT_OF_COLUMNS_NUMBER;

    const showList =
      !this.props.list.layouthint.has(SHOW_ONE_RESULT_AS_DETAIL) ||
      this.props.list.listItemCollection.length !== 1;

    const listClass = classNames("list", this.props.className, {
      "has-filters": this.props.list.filterCollection.hasItems,
      "has-detail": this.props.list.detail !== null && showList,
      "has-detail-only": this.props.list.detail !== null && !showList
    });

    const listDetailClass = classNames({
      "col-12 col-md-5": showList && !largeDetail,
      "col-12 col-md-7": showList && largeDetail,
      "col-12": !showList
    });

    return (
      <div className={listClass} data-id={this.props.list.key}>
        <ListHeader
          list={this.props.list}
          onContextItemClick={this.props.onContextItemClick}
        />
        <div className="row list-body">
          {this.props.list.filterCollection.hasItems && (
            <Filters
              className="col-2 hidden-xs-down list-filters"
              keepInView={this.props.keepPanelsInView}
              listHref={this.props.list.selfhref}
              filterCollection={this.props.list.filterCollection}
              onFilterChange={(attribute, value) => {
                if (this.props.onFilterChange) {
                  return this.props.onFilterChange(
                    this.props.list,
                    attribute,
                    value
                  );
                }

                return false;
              }}
              onSubmit={() => {
                if (this.props.onFilterSubmit) {
                  this.props.onFilterSubmit(this.props.list);
                }

                return false;
              }}
              onReset={() => {
                if (this.props.onFilterReset) {
                  this.props.onFilterReset(this.props.list);
                }

                return false;
              }}
            />
          )}
          {showList && (
            <ListMain
              list={this.props.list}
              viewType={this.state.viewType}
              availableViews={this.getAvailableViews()}
              onItemClick={href =>
                this.props.onItemClick(this.props.list, href)}
              onSortChange={this.props.onSortChange}
              onPageChange={this.props.onPageChange}
              onPageSizeChange={this.props.onPageSizeChange}
              onViewTypeChange={viewType => {
                this.setState({
                  viewType
                });
              }}
            />
          )}
          {this.props.list.detail !== null && (
            <ListDetail
              className={listDetailClass}
              detail={this.props.list.detail}
              keepInView={this.props.keepPanelsInView}
              onOpenCase={this.props.onOpenCase}
            />
          )}
        </div>
      </div>
    );
  }
}

export default List;
