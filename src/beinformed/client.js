// @flow
import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import setImmediate from "setimmediate";
import { AppContainer } from "react-hot-loader";

import Cache from "beinformed/util/browser/Cache";
import { createClientStore } from "beinformed/redux/createStore";
import { showXHRErrorNotification } from "beinformed/modules/Notification/redux/NotificationActions";
import ApplicationContainer from "beinformed/modules/Application/ApplicationContainer";
import ErrorBoundary from "beinformed/modules/Error/ErrorBoundary";

// Enable React Axe for a11y test (manual): @see https://github.com/dylanb/react-axe
// import ReactDOM from 'react-dom';
// import axe from 'react-axe';
//
// axe(React, ReactDOM, 1000);

/**
 * Mount the webapplication to the DOM, used client side when JavaScript is enabled.
 */
const client = (application: any = <ApplicationContainer />) => {
  const dataElement = document.querySelector(
    'script[type="application/json"][data-app-state="app-json"]'
  );
  if (!dataElement) {
    throw new Error("Error loading state, json not found");
  }
  const data = JSON.parse(dataElement.textContent);

  if (data === null || Object.keys(data).length === 0) {
    return;
  }

  Cache.clear();

  const store = createClientStore(data);

  window.onunhandledrejection = event => {
    if (event.detail) {
      return setImmediate(() => {
        const errorMessage = event.detail.reason.message.toString();

        store.dispatch(showXHRErrorNotification(errorMessage));
        throw event.detail.reason;
      });
    }

    return event;
  };

  if (document.body) {
    document.body.className = "js";
  }

  hydrate(
    <ErrorBoundary>
      <AppContainer>
        <Provider store={store}>{application}</Provider>
      </AppContainer>
    </ErrorBoundary>,
    document.getElementById("application")
  );
};

export { client };
