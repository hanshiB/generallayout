// @flow
import React from "react";
import Helmet from "react-helmet";
import acceptLanguage from "accept-language";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";

import {
  createServerStore,
  getHydratableState
} from "beinformed/redux/createStore";
import Href from "beinformed/models/href/Href";
import ApplicationContainer from "beinformed/modules/Application/ApplicationContainer";
import ErrorPage from "beinformed/modules/Error/ErrorPage";
import Locales from "beinformed/i18n/Locales";
import { locationChange } from "beinformed/modules/Router/redux/RouterActions";
import { loadServerState } from "beinformed/modularui/loadState";

/**
 * Create application
 */
const createApplication = (
  url,
  store,
  application = <ApplicationContainer />
) => renderToString(<Provider store={store}>{application}</Provider>);

/**
 * Create generic error page
 */
const createErrorPage = ({
  message,
  resource,
  line,
  trace
}: {
  message: string,
  resource: string,
  line: number,
  trace: string
}) =>
  renderToString(
    <ErrorPage
      errorMessage={message}
      errorResource={resource}
      errorLine={line}
      errorStack={trace}
    />
  );

/**
 * Create page html
 */
const createPage = (application, head, state = "") => `
  <!doctype html>
  <html ${head.htmlAttributes.toString()}>
    <head>
      <meta charset="utf-8" />
      ${head.title.toString()}
      ${head.base.toString()}
      ${head.meta.toString()}
      ${head.link.toString()}
      ${head.script.toString()}
      ${head.noscript.toString()}
      ${head.style.toString()}

      {CSSASSETS:<link rel="stylesheet" type="text/css" href="{FILE}" />:CSSASSETS}
    </head>
    <body class="nojs">
      <div id="application">${application}</div>
      <script type="application/json" data-app-state="app-json">
        ${state}
      </script>
      {JSASSETS:<script src="{FILE}"></script>:JSASSETS}
    </body>
  </html>
`;

/**
 * Returns the prefered user locale based on the available locales in the applicatio nand the accept-language header of the request.
 */
const getPreferredLocale = (request: HttpServletRequestJava): string => {
  const acceptLanguageHeader = request.getHeader("Accept-Language");

  if (acceptLanguageHeader === null) {
    return "en";
  }

  acceptLanguage.languages(Locales.getAvailableLocaleCodes());
  return acceptLanguage.get(acceptLanguageHeader);
};

const getQueryString = (request: HttpServletRequestJava): string => {
  const querystring = request.getQueryString();
  if (querystring === null) {
    return "";
  }

  return `?${querystring}`;
};

/**
 * Initialize Application server side.
 */
type serverPropsType = {
  request: HttpServletRequestJava,
  application?: any,
  locales?: typeof Locales
};
const server = ({
  request,
  application,
  locales = Locales
}: serverPropsType): string => {
  console.debug("Create isomorphic client"); // eslint-disable-line no-console

  const href = request.getPathInfo() + getQueryString(request);
  const locale = getPreferredLocale(request);

  const requestedHref = new Href(href);

  // Create initial state based on the requested href. Based on this data, the ui is rendered.
  let page = null;
  let store = null;

  try {
    const preloadedState = {
      ...loadServerState(requestedHref, locale),
      i18n: {
        locale,
        locales
      }
    };

    store = createServerStore(preloadedState);

    // store.dispatch(receiveLocale(locale));
    store.dispatch(locationChange(requestedHref));

    page = createApplication(href, store, application);
  } catch (err) {
    page = createErrorPage({
      message: err.message,
      resource: err.fileName || err.resource,
      line: err.lineNumber,
      trace: err.stack || err.trace
    });
  }

  const head = Helmet.renderStatic();

  if (store === null) {
    return createPage(page, head);
  }

  const serializedState = getHydratableState(store);

  return createPage(page, head, serializedState);
};

export { server };
