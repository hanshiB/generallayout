// @flow
import ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type ContentConfigurationResultsTypes =
  | ContentIntermediateResultElementJSON
  | ContentDecisionResultJSON
  | ContentClassificationResultJSON
  | ContentCalculatorResultJSON;

class ContentConfigurationResults {
  _configuration: ContentConfigurationResultsTypes | null;

  constructor(configuration?: ContentConfigurationResultsTypes) {
    this._configuration = configuration || null;
  }

  get label(): ?string {
    if (this._configuration === null) {
      return null;
    }

    return this._configuration.label;
  }

  get description(): ?string {
    if (this._configuration === null) {
      return null;
    }

    return this._configuration.description;
  }

  get attributes(): Array<string> {
    if (this._configuration === null) {
      return [];
    }

    return this._configuration.attributes || [];
  }

  getFormConfigElement(
    elementKey: string
  ): ContentConfigurationElements | null {
    if (this._configuration === null) {
      return null;
    }

    const configElement = this._configuration[elementKey];

    return new ContentConfigurationElements(configElement);
  }

  get calculatedResultElements(): ?ContentConfigurationElements {
    return this.getFormConfigElement("calculatedResultElements");
  }

  get positiveResultElements(): ?ContentConfigurationElements {
    return this.getFormConfigElement("positiveResultElements");
  }

  get negativeResultElements(): ?ContentConfigurationElements {
    return this.getFormConfigElement("negativeResultElements");
  }

  get resultElements(): ?ContentConfigurationElements {
    return this.getFormConfigElement("resultElements");
  }
}

export default ContentConfigurationResults;
