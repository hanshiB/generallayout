// @flow
import * as React from "react";
import classNames from "classnames";

import { BASE } from "beinformed/constants/Constants";
import Link from "beinformed/modules/Link/Link";

import "./ContentLink.scss";

import type ContentLinkModel from "beinformed/models/content/ContentLinkModel";
import type Href from "beinformed/models/href/Href";
type ContentLinkProps = {
  children?: any,
  className?: string,
  content: ContentLinkModel,
  isActive?: boolean,
  onClick?: (href: Href) => void
};

type ContentLinkState = {
  visible: boolean
};

/**
 * Renders a link to content
 */
class ContentLink extends React.Component<ContentLinkProps, ContentLinkState> {
  constructor(props: ContentLinkProps) {
    super(props);

    this.state = {
      visible: false
    };
  }

  render() {
    const isVisible = this.state.visible || this.props.isActive;
    const isHidden = !isVisible;

    const linkClass = classNames(
      "content-nav-item nav-item",
      this.props.className
    );
    const toggleClass = classNames("content-toc-toggle fa", {
      "fa-plus-square-o": isHidden,
      "fa-minus-square-o": isVisible
    });

    const children =
      this.props.children && isVisible ? this.props.children : null;

    return (
      <li className={linkClass}>
        {this.props.children && (
          <span
            className={toggleClass}
            tabIndex="0"
            role="button"
            onClick={() => {
              this.setState({
                visible: isHidden
              });
            }}
            onKeyDown={() => {
              this.setState({
                visible: isHidden
              });
            }}
          />
        )}
        <Link
          className="content-link"
          dataId={this.props.content.key || this.props.content.label}
          href={this.props.content.selfhref}
          onClick={this.props.onClick}
          isActive={this.props.isActive}
        >
          {this.props.content.contentType &&
            this.props.content.contentType.icon && (
              <img
                className="content-icon"
                src={`${BASE}${this.props.content.contentType.icon}`}
                alt={`Icon of ${this.props.content.contentType.label}`}
              />
            )}
          {(this.props.content.sourceLabel
            ? `${this.props.content.sourceLabel}: `
            : "") + this.props.content.label}
        </Link>
        {children}
      </li>
    );
  }
}

export default ContentLink;
