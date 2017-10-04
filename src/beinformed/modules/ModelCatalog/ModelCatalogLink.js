// @flow
import React from "react";
import classNames from "classnames";

import Href from "beinformed/models/href/Href";
import Link from "beinformed/modules/Link/Link";
import Icon from "beinformed/modules/Icon/Icon";
import { Message } from "beinformed/modules/I18n/Message";
import type LinkModel from "beinformed/models/links/LinkModel";

/**
 * Link to model catalog
 */
const ModelCatalogLink = ({
  link,
  isActive,
  onClick
}: {
  link: LinkModel,
  isActive: boolean,
  onClick: (href: Href) => void
}) => {
  const linkClass = classNames("modelcatalog-link nav-link", {
    active: isActive
  });

  return (
    <Link
      className={linkClass}
      dataId="modelcatalogLink"
      href={link.href}
      onClick={onClick}
    >
      <Icon name="share-alt" textAfter />
      <Message id="ModelCatalog.Menu" defaultMessage={link.label} />
    </Link>
  );
};

export default ModelCatalogLink;
