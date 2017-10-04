// @flow
import React, { Component } from "react";

import ModelCatalogLinkContainer from "beinformed/modules/ModelCatalog/ModelCatalogLinkContainer";
import EntryDateContainer from "beinformed/modules/ModelCatalog/EntryDateContainer";
import Icon from "beinformed/modules/Icon/Icon";

import "./ModelCatalogHeaderLink.scss";

type ModelCatalogHeaderLinkProps = {
  isActive: boolean
};

type ModelCatalogHeaderLinkState = {
  showEntryDate: boolean
};

/**
 * Render header link with entry date filter
 */
class ModelCatalogHeaderLink extends Component<
  ModelCatalogHeaderLinkProps,
  ModelCatalogHeaderLinkState
> {
  constructor(props: ModelCatalogHeaderLinkProps) {
    super(props);

    this.state = {
      showEntryDate: false
    };
  }

  render() {
    return (
      <div className="modelcatalog-header-link">
        <ModelCatalogLinkContainer />

        {this.props.isActive && (
          <button
            className="modelcatalog-entrydate-toggle btn btn-sm btn-link pl-0 mt-1"
            onClick={() =>
              this.setState({
                showEntryDate: !this.state.showEntryDate
              })}
          >
            <Icon name="calendar" />
          </button>
        )}

        {this.props.isActive &&
          this.state.showEntryDate && (
            <div className="entrydate">
              <EntryDateContainer />
            </div>
          )}
      </div>
    );
  }
}

export default ModelCatalogHeaderLink;
