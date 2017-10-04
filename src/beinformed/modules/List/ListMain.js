// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { injectMessage } from "beinformed/modules/I18n/Message";
import ActionChooser from "beinformed/modules/Action/ActionChooser";
import ButtonToolbar from "beinformed/modules/Button/ButtonToolbar";
import ListGroup from "beinformed/modules/List/ListGroup";
import ListViewTypeToggle from "beinformed/modules/List/ListViewTypeToggle";
import PagesizeChooser from "beinformed/modules/Paging/PagesizeChooser";
import Pagination from "beinformed/modules/Paging/Pagination";
import PagingInfo from "beinformed/modules/Paging/PagingInfo";
import SortChooser from "beinformed/modules/Sorting/SortChooser";
import MultiRowTaskContainer from "beinformed/modules/MultiRowTask/MultiRowTaskContainer";
import { MULTI_ROW_TASK } from "beinformed/constants/LayoutHints";
import type ListModel from "beinformed/models/list/ListModel";
import type Href from "beinformed/models/href/Href";

type ListMainProps = {
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

class ListMain extends Component<ListMainProps> {
  renderPagingInfo() {
    return (
      <div className="col-4">
        <PagingInfo list={this.props.list} />
      </div>
    );
  }

  renderTop() {
    const {
      list,
      message,
      viewType,
      availableViews,
      onSortChange,
      onViewTypeChange
    } = this.props;

    if (list.hasResults() || list.isFiltered() || list.context.hasContext()) {
      const isPaged = list.paging.totalResults > 1;

      const listHeaderClass = classNames("list-main-header", {
        "has-paging": isPaged
      });

      const headerRightClass = classNames("text-right", {
        "col-12": !isPaged,
        "col-8": isPaged
      });

      // Retrieve the list actions. When the list is in editable modus, the create action is not rendered on the list
      const listActions =
        list.viewType === "EditableTableView" && list.hasResults()
          ? list.actionCollection.all.filter(action => action.type !== "create")
          : list.actionCollection.all;

      const hasMultipleViewTypes =
        list.hasResults() && availableViews.length > 1;

      return (
        <div className={listHeaderClass}>
          <div className="row">
            {isPaged && this.renderPagingInfo()}

            <div className={headerRightClass}>
              <ButtonToolbar
                className="pull-right mb-1"
                ariaLabel={message(
                  "List.AriaLabel.HeaderToolbar",
                  "Available actions for {LIST_LABEL} list",
                  {
                    LIST_LABEL: list.label
                  }
                )}
              >
                {listActions && (
                  <ActionChooser
                    align="right"
                    size="small"
                    actions={listActions}
                  />
                )}

                {list.sorting.options.length > 1 &&
                  list.listItemCollection.length > 1 && (
                    <SortChooser
                      align="right"
                      size="small"
                      list={list}
                      onSort={onSortChange}
                    />
                  )}

                {hasMultipleViewTypes && (
                  <ListViewTypeToggle
                    activeType={viewType}
                    availableViews={availableViews}
                    listKey={list.key}
                    onChange={onViewTypeChange}
                  />
                )}
              </ButtonToolbar>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  renderMain() {
    const { list } = this.props;

    if (
      !list.hasResults() &&
      !list.isFiltered() &&
      list.actionCollection.length > 0
    ) {
      return <ActionChooser actions={list.actionCollection.all} />;
    }

    return <ListGroup grouping={list.grouping} list={list} {...this.props} />;
  }

  renderBottom() {
    const { list, onPageChange, onPageSizeChange } = this.props;

    const multiRowTaskActions = list.actionCollection.getActionsByLayoutHint(
      MULTI_ROW_TASK
    );

    const maxPageSize = list.paging.totalResults;
    const pagesizeOptions = list.paging.pagesize.options.filter(
      (option, i, arr) => option < maxPageSize || arr[i - 1] < maxPageSize
    );

    return (
      <div className="list-footer mt-1">
        {list.paging.maxpages > 1 && (
          <Pagination
            className="float-left"
            list={list}
            onChange={onPageChange}
          />
        )}
        {multiRowTaskActions.hasItems && (
          <MultiRowTaskContainer actions={multiRowTaskActions} />
        )}
        {pagesizeOptions.length >= 2 && (
          <PagesizeChooser
            className="float-right"
            align="right"
            size="small"
            direction="up"
            list={list}
            onChange={onPageSizeChange}
          />
        )}
      </div>
    );
  }

  render() {
    const { className, list } = this.props;

    const mainClass = classNames("list-main col", className, {
      "has-no-results": !list.hasResults(),
      "has-results": list.hasResults()
    });

    return (
      <div className={mainClass}>
        {this.renderTop()}
        {this.renderMain()}
        {list.hasResults() && this.renderBottom()}
      </div>
    );
  }
}

export default injectMessage(ListMain);
