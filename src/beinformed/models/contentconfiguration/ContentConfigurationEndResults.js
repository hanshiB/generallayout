// @flow
import ContentConfigurationResults from "beinformed/models/contentconfiguration/ContentConfigurationResults";

class ContentConfigurationEndResults {
  _configuration: ContentEndResultElementJSON | [];

  constructor(configuration: ContentEndResultElementJSON) {
    this._configuration = configuration || [];
  }

  get config(): Array<ContentConfigurationResults> {
    const config = [];

    this._configuration.forEach(configElement => {
      const elementKey = Object.keys(configElement)[0];

      if (elementKey === "calculatorResult" && configElement.calculatorResult) {
        config.push(
          new ContentConfigurationResults(configElement.calculatorResult)
        );
      }

      if (
        elementKey === "decisionResultElement" &&
        configElement.decisionResult
      ) {
        config.push(
          new ContentConfigurationResults(configElement.decisionResult)
        );
      }

      if (
        elementKey === "classificationResult" &&
        configElement.classificationResult
      ) {
        config.push(
          new ContentConfigurationResults(configElement.classificationResult)
        );
      }
    });

    return config;
  }
}

export default ContentConfigurationEndResults;
