// @flow
import { connect } from "react-redux";

import { locationChange } from "beinformed/modules/Router/redux/RouterActions";

import Link from "beinformed/modules/Link/Link";

import Href from "beinformed/models/href/Href";

type LinkProps = {
  ariaLabel?: string,
  children?: any,
  className?: string,
  dataId?: string | number,
  href: string,
  isActive?: boolean,
  isDisabled?: boolean,
  isDownload?: boolean,
  isNavLink?: boolean,
  style?: Object
};

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps: LinkProps) => {
  const { href, ...props } = ownProps;
  return {
    href: new Href(href),
    ...props
  };
};

export default connect(mapStateToProps, {
  onClick: href => locationChange(href)
})(Link);
