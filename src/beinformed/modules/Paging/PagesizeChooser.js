// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { Message } from "beinformed/modules/I18n/Message";
import ListHref from "beinformed/models/href/ListHref";
import Dropdown from "beinformed/modules/Dropdown/Dropdown";
import DropdownButton from "beinformed/modules/Dropdown/DropdownButton";
import DropdownChildren from "beinformed/modules/Dropdown/DropdownChildren";
import DropdownLink from "beinformed/modules/Dropdown/DropdownLink";
import type ListModel from "beinformed/models/list/ListModel";
import type Href from "beinformed/models/href/Href";

type PagesizeChooserProps = {
  align: "left" | "right",
  className: string,
  direction: "down" | "up",
  list: ListModel,
  size: "small" | "large" | "default",
  onChange: (href: Href) => void
};

/**
 * Render pagesize chooser
 */
class PagesizeChooser extends Component<PagesizeChooserProps> {
  render() {
    const { list, className, align, direction, size, onChange } = this.props;

    const maxPageSize = list.paging.totalResults;
    const sizeOptions = list.paging.pagesize.options.filter(
      (option, i, arr) => option < maxPageSize || arr[i - 1] < maxPageSize
    );

    const dropdownClass = classNames("pagesizechooser", className);

    return (
      <Dropdown
        align={align}
        className={dropdownClass}
        direction={direction}
        activeValue={list.paging.pagesize.value.toString()}
      >
        <DropdownButton className="btn-light" size={size}>
          <Message
            id="PagesizeChooser.PageSize"
            defaultMessage="Page size: {PAGESIZE}"
            data={{ PAGESIZE: list.paging.pagesize.value }}
          />
        </DropdownButton>
        <DropdownChildren>
          {sizeOptions.map((option, i) => {
            const pagesizeHref: ListHref = new ListHref(
              this.props.list.selfhref
            );

            pagesizeHref.pagesize = option;
            pagesizeHref.page = 1;

            return (
              <DropdownLink
                key={i}
                value={option.toString()}
                href={pagesizeHref}
                onClick={onChange}
              >
                {option.toString()}
              </DropdownLink>
            );
          })}
        </DropdownChildren>
      </Dropdown>
    );
  }
}

export default PagesizeChooser;
