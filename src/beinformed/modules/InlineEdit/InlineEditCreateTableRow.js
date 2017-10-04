// @flow
import React, { Component } from "react";

import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import Icon from "beinformed/modules/Icon/Icon";
import Link from "beinformed/modules/Link/Link";
import InlineEditActionsCell from "beinformed/modules/InlineEdit/InlineEditActionsCell";
import EditableListItemModel from "beinformed/models/list/EditableListItemModel";
import type ActionModel from "beinformed/models/actions/ActionModel";
import type ListModel from "beinformed/models/list/ListModel";

type InlineEditCreateTableRowProps = {
  action: ActionModel,
  children?: any,
  cloneListItemId: string | number | null,
  list: ListModel,

  onAttributeChange: Function,
  onFinishProgress: Function,
  onSave: Function,
  onStartProgress: Function
};

type InlineEditCreateTableRowState = {
  hasFocus?: boolean,
  hasChanges: boolean,
  hasErrors: boolean,
  isSaving: boolean,
  showCreateRow: boolean,
  item: EditableListItemModel | null
};

/**
 * Render an Inline edit create row
 */
class InlineEditCreateTableRow extends Component<
  InlineEditCreateTableRowProps,
  InlineEditCreateTableRowState
> {
  _createRow: ?HTMLDivElement;

  constructor(props: InlineEditCreateTableRowProps) {
    super(props);

    this.state = {
      hasFocus: false,
      hasChanges: false,
      hasErrors: false,
      isSaving: false,
      showCreateRow: false,
      item: null
    };
  }

  /**
   * When a clone list item id is present render the create row with the item to clone as list item input
   */
  componentWillReceiveProps(nextProps: InlineEditCreateTableRowProps) {
    // when current result equals next result, the create row is saved
    if (
      this.props.list.listItemCollection.length !==
      nextProps.list.listItemCollection.length
    ) {
      this.setState({
        showCreateRow: false,
        isSaving: false,
        hasErrors: false,
        hasChanges: false,
        item: null
      });
    } else if (nextProps.cloneListItemId !== null && this.state.item === null) {
      // show clone create row
      this.setState({
        item: this.cloneEditableListItem(nextProps.cloneListItemId),
        showCreateRow: true,
        hasErrors: false,
        hasChanges: true
      });
    }
  }

  /**
   * Method handling an element change
   */
  handleCellChange = (attribute: AttributeType, inputvalue: string) => {
    this.props.onAttributeChange(
      this.props.list,
      this.state.item,
      attribute,
      inputvalue
    );

    this.setState({
      hasChanges: true,
      hasErrors: this.state.item !== null && !this.state.item.isValid
    });
  };

  /**
   * Method handling when cancel button clicked
   */
  handleCancelClick = (e: SyntheticEvent<*>) => {
    e.preventDefault();

    this.props.onStartProgress();
    this.setState({
      hasChanges: false,
      hasFocus: false,
      hasErrors: false,
      showCreateRow: false,
      item: null
    });
    this.props.onFinishProgress();
  };

  /**
   * Method handling an element blur
   */
  handleCellBlur = () => {
    this.setState({
      hasFocus: false
    });

    const TIMEOUT_BEFORE_SAVE = 200;

    setTimeout(() => {
      if (!this.state.hasFocus) {
        this.handleSaveClick();
      }
    }, TIMEOUT_BEFORE_SAVE);
  };

  /**
   * Method handling click on the save button
   */
  handleSaveClick = () => {
    if (
      !this.state.isSaving &&
      this.state.hasChanges &&
      !this.state.hasErrors
    ) {
      this.setState({
        isSaving: true,
        hasFocus: false
      });

      this.props.onSave(this.props.list, this.state.item);
    }
  };

  /**
   * Method handling an element focus
   */
  handleCellFocus = () => {
    this.setState({
      hasFocus: true
    });
  };

  /**
   * Method handling the click on the create button
   */
  handleCreateClick = () => {
    this.props.onStartProgress();
    const newItem = this.newEditableListItem();

    this.setState({
      item: newItem,
      showCreateRow: true
    });
    this.props.onFinishProgress();
  };

  /**
   * Scroll create row into view
   */
  scrollIntoView() {
    const SCROLL_TIMEOUT = 200;

    setTimeout(() => {
      if (this._createRow) {
        const elementBottom = this._createRow.getBoundingClientRect().bottom;
        window.scrollTo(0, elementBottom);
      }
    }, SCROLL_TIMEOUT);
  }

  /**
   * Clone an EditableListItem model by id
   */
  cloneEditableListItem(cloneId: string | number | null) {
    if (cloneId === null) {
      return null;
    }

    const itemData = {
      _id: "clone"
    };

    const originalItem = this.props.list.getListItemById(cloneId);

    this.props.list.headers.forEach(header => {
      const attribute = originalItem.getAttributeByKey(header.key);

      itemData[header.key] = attribute.readonly ? null : attribute.value;
    });

    return this.createEditableListItem(itemData);
  }

  /**
   * Create a new EditableListItem model
   * @return {EditableListItem}
   */
  newEditableListItem() {
    const itemData = {
      _id: "create"
    };

    return this.createEditableListItem(itemData);
  }

  /**
   * Create a new list item model,
   * create a new response with the request parameters as fields for the create list item
   */
  createEditableListItem(data: ListItemJSON) {
    const action = this.props.action;

    const itemContribution = {
      attributes: [],
      metadata: {
        _id: {
          type: "number"
        }
      }
    };
    const itemAttributes = {
      _id: data._id
    };

    action.fields.forEach(field => {
      itemAttributes[field.name] = data[field.name];

      const fieldContributions = field.contributions;
      fieldContributions.readonly = field.contributions.readonly || false;

      itemContribution.attributes.push({ [field.name]: fieldContributions });
    });

    const listitemInput = new ModularUIResponse();
    listitemInput.key = action.key;
    listitemInput.data = itemAttributes;
    listitemInput.contributions = itemContribution;

    const listitem = new EditableListItemModel(listitemInput, action);

    return listitem;
  }

  render() {
    const stateItem = this.state.item;

    if (stateItem && stateItem !== null && this.state.showCreateRow) {
      const itemId = stateItem === null ? "" : stateItem.id;

      return (
        <div
          className="table-row create-table-row"
          ref={c => {
            this._createRow = c;
          }}
          data-id={itemId}
        >
          {this.props.list.headers.map(header => {
            const attribute = stateItem.getAttributeByKey(header.key);
            if (attribute) {
              return React.cloneElement(
                React.Children.only(this.props.children),
                {
                  attribute,
                  item: this.state.item,
                  key: `${itemId}--${header.key}`,
                  onChange: value => this.handleCellChange(attribute, value),
                  onBlur: this.handleCellBlur,
                  onFocus: this.handleCellFocus
                }
              );
            }

            return null;
          })}
          <InlineEditActionsCell
            rowHasErrors={this.state.hasErrors}
            isSaving={this.state.isSaving}
            itemId={itemId}
            showCancelButton
            showSaveButton={this.state.hasChanges}
            onCancelClick={this.handleCancelClick}
            onSaveClick={this.handleSaveClick}
            onBlur={this.handleCellBlur}
            onFocus={this.handleCellFocus}
          />
        </div>
      );
    }

    return (
      <Link
        key={this.props.action.name}
        href={this.props.action.selfhref}
        className="btn btn-light btn-task mt-1"
        dataId={`${this.props.list.key}--create`}
        onClick={this.handleCreateClick}
      >
        <Icon name="plus" />
        {` ${this.props.action.label}`}
      </Link>
    );
  }
}

export default InlineEditCreateTableRow;
