// @flow
import React, { Component } from "react";

import ConceptLink from "beinformed/modules/ConceptDetail/ConceptLink";
import TextInput from "beinformed/modules/FormInput/TextInput";

import "./ModelCatalogSearch.scss";

import type ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";
import type Href from "beinformed/models/href/Href";

type ModelCatalogSearchProps = {
  message: messageFunctionType,
  search: ConceptIndexModel,
  onChange: (value: string) => void,
  onConceptClick: (href: Href) => void
};

type ModelCatalogSearchState = {
  searchTerm: string,
  showResult: boolean
};

/**
 * Entry date for modelcatalog
 */
class ModelCatalogSearch extends Component<
  ModelCatalogSearchProps,
  ModelCatalogSearchState
> {
  constructor(props: ModelCatalogSearchProps) {
    super(props);

    this.state = {
      searchTerm: "",
      showResult: false
    };
  }

  /**
   * componentDidMount, sets a click handler on the document to hide search results when document is clicked
   */
  componentDidMount() {
    window.addEventListener("click", this.handleDocumentClick);
  }

  /**
   * When component receives props, check if this is a new search form. In that case reset searchOption
   */
  componentWillReceiveProps(nextProps: ModelCatalogSearchProps) {
    this.setState({
      showResult: nextProps.search && nextProps.search.items.hasItems
    });
  }

  /**
   * componentWillUnmount, removes document wide click event observer
   */
  componentWillUnmount() {
    window.removeEventListener("click", this.handleDocumentClick);
  }

  handleDocumentClick = (e: SyntheticEvent<*>) => {
    if (e.target instanceof HTMLElement) {
      this.setState({
        showResult: e.target.id === "searchTerm"
      });
    }
  };

  /**
   * @overwrite
   */
  render() {
    const { message, search, onChange, onConceptClick } = this.props;

    return (
      <div className="modelcatalog-search">
        <TextInput
          name="searchTerm"
          value={this.state.searchTerm}
          placeholder={message(
            "ModelCatalogSearch.Placeholder",
            "Search concept by label"
          )}
          onChange={value => {
            this.setState({
              searchTerm: value
            });
            onChange(value);
          }}
        />
        {search &&
          search.items.hasItems &&
          this.state.showResult &&
          this.state.searchTerm !== "" && (
            <div className="modelcatalog-search-result">
              <ul className="nav flex-column mb-1">
                {search.items.all.map((concept, idx) => (
                  <li
                    key={`${concept.key}-${idx}`}
                    className="nav-item modelcatalog-search-result-item"
                  >
                    <ConceptLink concept={concept} onClick={onConceptClick} />
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  }
}

export default ModelCatalogSearch;
