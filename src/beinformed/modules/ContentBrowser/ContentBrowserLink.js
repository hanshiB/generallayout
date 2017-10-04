// @flow
import React from "react";
import classNames from "classnames";

import Link from "beinformed/modules/Link/Link";
import Icon from "beinformed/modules/Icon/Icon";
import { Message } from "beinformed/modules/I18n/Message";

import "./ContentBrowserLink.scss";

import type LinkModel from "beinformed/models/links/LinkModel";
import type Href from "beinformed/models/href/Href";

export type ContentBrowserLinkProps = {
  isActive: boolean,
  link: LinkModel,
  onClick: (href: Href) => void
};

/**
 * Create link to the contentbrowser
 */
const ContentBrowserLink = ({
  link,
  isActive,
  onClick
}: ContentBrowserLinkProps) => {
  const linkClass = classNames("contentbrowser-link nav-link", {
    active: isActive
  });

  return (
    <Link
      className={linkClass}
      dataId="contentbrowserLink"
      href={link.href}
      onClick={onClick}
    >
      <Icon name="book" textAfter />
      <Message id="ContentBrowser.Menu" defaultMessage={link.label} />
    </Link>
  );
};

export default ContentBrowserLink;
