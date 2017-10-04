// @flow
import React from "react";
import classNames from "classnames";

import { Message } from "beinformed/modules/I18n/Message";
import ListView from "beinformed/modules/List/ListView/List";

import "./QuickSearchResults.scss";

import type CaseSearchModel from "beinformed/models/search/CaseSearchModel";
import type Href from "beinformed/models/href/Href";

type QuickSearchType = {
  className?: string,
  search: CaseSearchModel,
  onItemClick: (href: Href) => void
};

/**
 * Render default text field
 */
const QuickSearch = ({ className, search, onItemClick }: QuickSearchType) => {
  const resultsClass = classNames("quicksearch-results", className, {
    "no-results": !search.hasResults()
  });

  if (search.hasResults()) {
    return (
      <div className={resultsClass}>
        <ListView list={search} onItemClick={onItemClick} />
      </div>
    );
  }

  return (
    <div className={resultsClass}>
      <Message
        id="QuickSearchResuls.Msg.NoResults"
        defaultMessage="No search results"
      />
    </div>
  );
};

export default QuickSearch;
