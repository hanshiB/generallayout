// @flow
import React from "react";

import { BEINFORMED_PATH } from "beinformed/constants/Constants";
import HTMLHead from "beinformed/modules/HTMLHead/HTMLHead";

/**
 * Render a generic error page
 */
const NotFound = () => (
  <div className="application">
    <HTMLHead title="Not found" locale="en" />

    <div className="errorpage jumbotron">
      <p className="lead">
        Sorry, but the page you are looking for was either not found or does not
        exist.<br />
        Try refreshing the page or click on the button below to go back to the
        Homepage.
      </p>
      <a href={BEINFORMED_PATH} className="btn btn-primary btn-lg mt-4">
        Homepage
      </a>
    </div>
  </div>
);

export default NotFound;
