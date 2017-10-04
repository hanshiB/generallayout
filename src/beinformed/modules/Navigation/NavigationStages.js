// @flow
import React, { Component } from "react";

import NavigationItem from "beinformed/modules/Navigation/NavigationItem";
import type ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";
import type LinkCollection from "beinformed/models/links/LinkCollection";
import type LinkModel from "beinformed/models/links/LinkModel";
import type Href from "beinformed/models/href/Href";

type NavigationStagesProps = {
  activeLink: LinkModel | null,
  executableStages: ChoiceAttributeModel | null,
  items: LinkCollection,
  performedStages: ChoiceAttributeModel | null,
  onClick: (href: Href) => void
};

class NavigationStages extends Component<NavigationStagesProps> {
  getStages() {
    const { items, executableStages, performedStages } = this.props;

    return items.links.map(link => {
      const newLink = link;
      const linkKey = link.key.replace(/_/g, "").toLowerCase();

      if (
        executableStages &&
        executableStages.selected.find(
          executableStage => executableStage.toLowerCase() === linkKey
        )
      ) {
        newLink.icon = "exclamation-circle";
      } else if (
        performedStages &&
        performedStages.selected.find(
          performedStage => performedStage.toLowerCase() === linkKey
        )
      ) {
        newLink.icon = "check-circle";
      }

      return newLink;
    });
  }

  render() {
    const { activeLink, onClick } = this.props;

    return (
      <ul className="nav nav-tabs stages caseview-panel-tabs">
        {this.getStages().map(link => (
          <NavigationItem
            key={link.key}
            link={link}
            onClick={onClick}
            isActive={activeLink !== null && link.isActive(activeLink)}
          />
        ))}
      </ul>
    );
  }
}

export default NavigationStages;
