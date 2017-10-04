import ApplicationModel from "beinformed/models/application/ApplicationModel";
import UserServicesModel from "beinformed/models/user/UserServicesModel";

import mockWebapp from "./webapp.json";
import mockWebappContributions from "./webappContributions.json";

import { modularuiResponse } from "beinformed/modularui/ModularUI";

describe("Application", () => {
  it("should be able to create an empty Application object", () => {
    const application = new ApplicationModel({});

    expect(application.type).toBe("Application");
    expect(application.label).toBe("");
    expect(application.tabs.size).toBe(0);
    expect(application.user).toBe(null);
  });

  it("Application model is applicable for contributions with resourcetype Application", () => {
    expect(
      ApplicationModel.isApplicableModel({
        contributions: mockWebappContributions.webapplication
      })
    ).toBe(true);
  });

  it("should create an application object with links an a label on a typical modular ui response", () => {
    const application = new ApplicationModel({
      key: "Webapp",
      data: mockWebapp.webapplication,
      contributions: mockWebappContributions.webapplication
    });

    expect(application instanceof ApplicationModel).toBe(true);
    expect(application.label).toBe("Webapp");
    expect(application.tabs.size).toBe(4);
    expect(application.getInitialChildModelLinks().length).toBe(1);
    expect(application.modelcatalog.label).toBe("Model catalog");
    expect(application.contentbrowser.label).toBe("Content browser");

    application.userServices = null;
    expect(application.userServices).toBe(null);

    application.userServices = new UserServicesModel({});
    expect(application.userServices).toEqual(new UserServicesModel({}));
  });

  it("Can set a layouthint to toggle full page forms", () => {
    const application = new ApplicationModel({});

    expect(application.fullPageForms).toBe(false);

    application.layouthint.add("full-page-forms");

    expect(application.fullPageForms).toBe(true);
  });

  it("Sets user service models as child models", () => {
    const application = new ApplicationModel({});

    application.addChildModels([]);
    expect(application.userServices).toBe(null);

    application.addChildModels([new UserServicesModel({})]);

    expect(application.userServices).toEqual(new UserServicesModel({}));
  });
});
