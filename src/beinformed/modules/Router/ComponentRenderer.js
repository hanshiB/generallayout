// @flow
import React from "react";

import ModelCatalogContainer from "beinformed/modules/ModelCatalog/ModelCatalogContainer";
import ContentBrowserContainer from "beinformed/modules/ContentBrowser/ContentBrowserContainer";
import TabContainer from "beinformed/modules/Tab/TabContainer";
import FormContainer from "beinformed/modules/Form/FormContainer";
import HomePage from "beinformed/modules/HomePage/HomePage";
import NotFound from "beinformed/modules/NotFound/NotFound";

import type Href from "beinformed/models/href/Href";

/**
 * Example of how to render static pages based on url. Homepage is the fallback.
 */
// eslint-disable-next-line no-unused-vars
const StaticPageRenderer = ({ url }: { url: Href }) => <HomePage />;

const ComponentRenderer = ({
  componentType,
  url,
  fullPageForms
}: {
  componentType: string,
  url: Href,
  fullPageForms: boolean
}) => {
  switch (componentType) {
    case "ModelCatalog":
      return <ModelCatalogContainer />;
    case "ContentBrowser":
      return <ContentBrowserContainer />;
    case "Tab":
      return <TabContainer />;
    case "Form":
      return <FormContainer fullPageForms={fullPageForms} />;
    case "Root":
      return <StaticPageRenderer url={url} />;
    default:
      return <NotFound />;
  }
};

export default ComponentRenderer;
