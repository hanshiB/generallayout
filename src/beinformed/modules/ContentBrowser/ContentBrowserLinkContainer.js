// @flow
import { connect } from "react-redux";

import { gotoContentBrowser } from "beinformed/modules/ContentBrowser/redux/ContentBrowserActions";
import ContentBrowserLink from "beinformed/modules/ContentBrowser/ContentBrowserLink";

import type { Connector } from "react-redux";
import type { ContentBrowserLinkProps } from "beinformed/modules/ContentBrowser/ContentBrowserLink";

type ContentBrowserLinkContainerProps = {
  isActive?: boolean
};

/**
 * Map state to props
 */
const mapStateToProps = (
  state: State,
  ownProps: ContentBrowserLinkContainerProps
) => ({
  link: state.application.contentbrowser,
  isActive: ownProps.isActive
});

const connector: Connector<
  ContentBrowserLinkContainerProps,
  ContentBrowserLinkProps
> = connect(mapStateToProps, {
  onClick: gotoContentBrowser
});

export default connector(ContentBrowserLink);
