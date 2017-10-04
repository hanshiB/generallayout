// @flow
import React from "react";

import { HIDE_MODELCATALOG } from "beinformed/constants/LayoutHints";
import LoginModalContainer from "beinformed/modules/Login/LoginModalContainer";
import NotificationContainer from "beinformed/modules/Notification/NotificationContainer";
import ProgressIndicatorContainer from "beinformed/modules/ProgressIndicator/ProgressIndicatorContainer";
import HTMLHead from "beinformed/modules/HTMLHead/HTMLHead";
import ApplicationHeader from "beinformed/modules/ApplicationHeader/ApplicationHeader";
import RouterContainer from "beinformed/modules/Router/RouterContainer";
import type ApplicationModel from "beinformed/models/application/ApplicationModel";

export type ApplicationProps = {
  application: ApplicationModel,
  locale: string,
  renderLogin: boolean
};

/**
 * Renders application
 */
const Application = ({
  application,
  locale,
  renderLogin
}: ApplicationProps) => (
  <div className="application">
    <HTMLHead title={application.label} locale={locale} />

    <NotificationContainer />
    <ApplicationHeader
      hideModelCatalog={application.layouthint.has(HIDE_MODELCATALOG)}
    />

    <RouterContainer />

    {renderLogin && <LoginModalContainer />}

    <ProgressIndicatorContainer />
  </div>
);

export default Application;
