// @flow
import React, { Component } from "react";
import classNames from "classnames";

import ListItemCollection from "beinformed/models/list/ListItemCollection";
import AttributeList from "beinformed/modules/AttributeList/AttributeList";
import ListResults from "beinformed/modules/List/ListResults";
import type GroupingModel from "beinformed/models/grouping/GroupingModel";
import type ListModel from "beinformed/models/list/ListModel";
import type Href from "beinformed/models/href/Href";

type ListGroupProps = {
  className?: string,
  grouping: GroupingModel,
  level?: number,
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

/**
 * Render List groups
 */
class ListGroup extends Component<ListGroupProps> {
  static defaultProps = {
    level: 1
  };

  /**
   * Retrieve all list item that have a reference to the group reference
   */
  getFilteredList(list: ListModel, references: Array<number>) {
    const filteredList = list.clone();

    filteredList.listItemCollection = new ListItemCollection();
    filteredList.listItemCollection.collection = list.listItemCollection.filter(
      listitem => references.includes(listitem.id)
    );

    return filteredList;
  }

  render() {
    const groupHeaderClass = classNames("grouped-list-header", {
      h4: this.props.level === 1
    });

    if (this.props.grouping.hasGroups()) {
      return (
        <div className="grouped-list">
          {this.props.grouping.groups.map(group => (
            <div
              key={group.id}
              className="grouped-list-group"
              data-id={group.id}
            >
              <AttributeList
                direction="horizontal"
                className={groupHeaderClass}
                attributes={group.attributeCollection.all}
              />

              {group.reference &&
                group.reference.length > 0 && (
                  <ListResults
                    {...this.props}
                    list={this.getFilteredList(
                      this.props.list,
                      group.reference
                    )}
                  />
                )}

              {group.grouping && (
                <ListGroup
                  {...this.props}
                  grouping={group.grouping}
                  level={this.props.level + 1}
                />
              )}
            </div>
          ))}
        </div>
      );
    }

    return <ListResults {...this.props} />;
  }
}

export default ListGroup;
