import React from "react";
import { client } from "beinformed/client";
import ApplicationContainer from "beinformed/modules/Application/ApplicationContainer";

client(<ApplicationContainer />);

// When Hot Module Replacement is enabled
if (module.hot) {
  module.hot.accept(
    "./beinformed/modules/Application/ApplicationContainer",
    () => {
      client(ApplicationContainer);
    }
  );
}
