// @flow
import { connect } from "react-redux";

import ContentBrowser from "beinformed/modules/ContentBrowser/ContentBrowser";

import type { Connector } from "react-redux";
import type { ContentBrowserProps } from "beinformed/modules/ContentBrowser/ContentBrowser";

/**
 * Map state to props
 */
const mapStateToProps = (state: State) => ({
  contentTOC: state.contentdetail.contentTOC,
  contentDetail: state.contentdetail.contentDetail,
  contentIndex: state.contentindex
});

const connector: Connector<{}, ContentBrowserProps> = connect(
  mapStateToProps,
  {}
);

export default connector(ContentBrowser);
