// @flow
import { connect } from "react-redux";

import { popState } from "beinformed/modules/Router/redux/RouterActions";
import ComponentRenderer from "beinformed/modules/Router/ComponentRenderer";
import Router from "beinformed/modules/Router/Router";

import Href from "beinformed/models/href/Href";

const componentToRender = (state, props) => {
  const url = state.router.url;
  const hasCaseTab = state.tab !== null;
  const hasCaseView = state.caseview !== null;
  const hasForm = state.form !== null;
  const fullPageForms = props.fullPageForms || state.application.fullPageForms;

  if (fullPageForms && hasForm) {
    return "Form";
  } else if (hasForm) {
    return "FormModal";
  }

  const isRoot = url.path.split("/").length - 1 === 1;

  const isModelCatalog =
    url.startsWith(new Href("/modelcatalog")) ||
    url.startsWith(new Href("/concepts"));

  const isContentBrowser =
    url.startsWith(new Href("/contentbrowser")) ||
    url.startsWith(new Href("/content"));

  if (isModelCatalog) {
    return "ModelCatalog";
  } else if (isContentBrowser) {
    return "ContentBrowser";
  } else if (hasCaseTab) {
    return "Tab";
  } else if (hasCaseView) {
    return "CaseView";
  } else if (isRoot) {
    return "Root";
  }

  return "NotFound";
}

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps) => ({
  url: state.router.url,
  componentType: componentToRender(state, ownProps),
  renderer: ownProps.renderer || ComponentRenderer
});

export default connect(mapStateToProps, {
  onPopState: popState
})(Router);
