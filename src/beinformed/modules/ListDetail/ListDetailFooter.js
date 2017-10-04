// @flow
import React from "react";

import ActionChooser from "beinformed/modules/Action/ActionChooser";
import Icon from "beinformed/modules/Icon/Icon";
import LinkButton from "beinformed/modules/Button/LinkButton";
import PanelFooter from "beinformed/modules/Panel/PanelFooter";
import type DetailModel from "beinformed/models/detail/DetailModel";
import type Href from "beinformed/models/href/Href";

/**
 * Render detail footer with actions and to caseview action
 */
const ListDetailFooter = ({
  detail,
  onOpenCase
}: {
  detail: DetailModel,
  onOpenCase?: (href: Href) => void
}) => (
  <PanelFooter>
    {detail.actionCollection.size > 0 && (
      <ActionChooser actions={detail.actionCollection.all} direction="up" />
    )}

    {detail.isCase() &&
      onOpenCase && (
        <LinkButton
          href={detail.selfhref}
          className="btn-opencase card-link float-lg-right"
          buttonStyle="primary"
          onClick={onOpenCase}
        >
          <Icon name="folder-open" /> {detail.titleAttribute.value}
        </LinkButton>
      )}
  </PanelFooter>
);

export default ListDetailFooter;
