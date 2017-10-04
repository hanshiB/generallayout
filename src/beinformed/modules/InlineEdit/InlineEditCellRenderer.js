// @flow
import React, { Component } from "react";

import EditableListItemModel from "beinformed/models/list/EditableListItemModel";
import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";
import DateAttributeModel from "beinformed/models/attributes/DateAttributeModel";
import LookupAttributeModel from "beinformed/models/attributes/LookupAttributeModel";
import MemoAttributeModel from "beinformed/models/attributes/MemoAttributeModel";
import NumberAttributeModel from "beinformed/models/attributes/NumberAttributeModel";
import PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import TimeAttributeModel from "beinformed/models/attributes/TimeAttributeModel";
import TimestampAttributeModel from "beinformed/models/attributes/TimestampAttributeModel";
import UploadAttributeModel from "beinformed/models/attributes/UploadAttributeModel";
import XMLAttributeModel from "beinformed/models/attributes/XMLAttributeModel";
import InlineEditChoiceCell from "beinformed/modules/InlineEdit/InlineEditChoiceCell";
import InlineEditDatetimeCell from "beinformed/modules/InlineEdit/InlineEditDatetimeCell";
import InlineEditLookupCell from "beinformed/modules/InlineEdit/InlineEditLookupCell";
import InlineEditMemoCell from "beinformed/modules/InlineEdit/InlineEditMemoCell";
import InlineEditNumberCell from "beinformed/modules/InlineEdit/InlineEditNumberCell";
import InlineEditPasswordCell from "beinformed/modules/InlineEdit/InlineEditPasswordCell";
import InlineEditStringCell from "beinformed/modules/InlineEdit/InlineEditStringCell";
import InlineEditUploadCell from "beinformed/modules/InlineEdit/InlineEditUploadCell";
import InlineEditXMLCell from "beinformed/modules/InlineEdit/InlineEditXMLCell";

type InlineEditCellRendererProps = {
  attribute: AttributeType,
  item: EditableListItemModel,
  onBlur: Function,
  onChange: Function,
  onFocus: Function,
  onSubmit?: Function
};

type InlineEditCellRendererState = {
  hasFocus: boolean
};

/**
* Render correct widget
*/
class InlineEditCellRenderer extends Component<
  InlineEditCellRendererProps,
  InlineEditCellRendererState
> {
  /**
   * constructor
   * @param {Object} props - Properties
   */
  constructor(props: InlineEditCellRendererProps) {
    super(props);

    this.state = {
      hasFocus: false
    };
  }

  /**
   * Method handling an element change
   */
  handleChange = (inputvalue: string) => {
    this.props.onChange(this.props.attribute, inputvalue);
  };

  /**
   * Method handling an element focus
   */
  handleFocus = (e: SyntheticEvent<*>) => {
    this.setState({
      hasFocus: true
    });
    this.props.onFocus(e);
  };

  /**
   * Method handling an element blur
   */
  handleBlur = (e: SyntheticEvent<*>) => {
    this.setState({
      hasFocus: false
    });
    this.props.onBlur(e);
  };

  render() {
    const { attribute, ...props } = this.props;

    const name = `${props.item.id}--${attribute.name}`;

    if (attribute instanceof ChoiceAttributeModel) {
      return (
        <InlineEditChoiceCell
          attribute={attribute}
          className=""
          id={name}
          name={name}
          hasFocus={this.state.hasFocus}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
      );
    }

    if (
      attribute instanceof DateAttributeModel ||
      attribute instanceof TimeAttributeModel ||
      attribute instanceof TimestampAttributeModel
    ) {
      return (
        <InlineEditDatetimeCell
          attribute={attribute}
          className=""
          id={name}
          name={name}
          hasFocus={this.state.hasFocus}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
      );
    }

    if (attribute instanceof LookupAttributeModel) {
      return (
        <InlineEditLookupCell
          attribute={attribute}
          className=""
          id={name}
          name={name}
          hasFocus={this.state.hasFocus}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
      );
    }

    if (attribute instanceof MemoAttributeModel) {
      return (
        <InlineEditMemoCell
          attribute={attribute}
          className=""
          id={name}
          name={name}
          hasFocus={this.state.hasFocus}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
      );
    }

    if (attribute instanceof NumberAttributeModel) {
      return (
        <InlineEditNumberCell
          attribute={attribute}
          className=""
          id={name}
          name={name}
          hasFocus={this.state.hasFocus}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
      );
    }

    if (attribute instanceof PasswordAttributeModel) {
      return (
        <InlineEditPasswordCell
          attribute={attribute}
          className=""
          id={name}
          name={name}
          hasFocus={this.state.hasFocus}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
      );
    }

    if (attribute instanceof UploadAttributeModel) {
      return (
        <InlineEditUploadCell
          attribute={attribute}
          className=""
          id={name}
          name={name}
          hasFocus={this.state.hasFocus}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
      );
    }

    if (attribute instanceof XMLAttributeModel) {
      return (
        <InlineEditXMLCell
          attribute={attribute}
          className=""
          id={name}
          name={name}
          hasFocus={this.state.hasFocus}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
      );
    }

    if (attribute instanceof StringAttributeModel) {
      return (
        <InlineEditStringCell
          attribute={attribute}
          className=""
          id={name}
          name={name}
          hasFocus={this.state.hasFocus}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
      );
    }

    return null;
  }
}

export default InlineEditCellRenderer;
