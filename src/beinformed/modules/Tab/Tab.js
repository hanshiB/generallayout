// @flow
import React from "react";
import classNames from "classnames";
import Helmet from "react-helmet";

import TabComponentContainer from "beinformed/modules/TabComponent/TabComponentContainer";
import FoldoutTaskMenu from "beinformed/modules/TaskGroup/FoldoutTaskMenu";
import TabHeader from "beinformed/modules/Tab/TabHeader";

import "./Tab.scss";

import type TabModel from "beinformed/models/tab/TabModel";

import Breadcrumb from "beinformed/modules/Breadcrumb2/Breadcrumb";

export type TabProps = {
  tab: TabModel
};

/**
 * Render a tab (root)
 */
const Tab = ({ tab }: TabProps) => {
  const tabClass = classNames("tab", {
    "has-taskgroups": tab.hasTaskGroups(),
    "has-search": tab.hasSearch()
  });

  if (tab) {
    return (
      <div className={tabClass}>
        <Helmet>
          <title>{tab.label}</title>
        </Helmet>

        {(tab.hasTaskGroups() || tab.hasActions()) && (
          <FoldoutTaskMenu
            taskgroups={tab.taskGroupCollection}
            actions={tab.actionCollection}
            label={tab.label}
          />
        )}
        {tab.hasComponents() && <TabHeader tab={tab} />}

        <Breadcrumb />

        <TabComponentContainer />
      </div>
    );
  }

  return null;
};

export default Tab;
