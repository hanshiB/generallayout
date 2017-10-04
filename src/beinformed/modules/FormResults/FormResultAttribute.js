// @flow
import React, { Component } from "react";

import FormAttribute from "beinformed/modules/FormAttribute/FormAttribute";
import FormResultAttributeClassification from "beinformed/modules/FormResults/FormResultAttributeClassification";
import FormResultAttributeDecision from "beinformed/modules/FormResults/FormResultAttributeDecision";

import type ContentConfigurationResults from "beinformed/models/contentconfiguration/ContentConfigurationResults";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type FormResultAttributeProps = {
  id: string,
  attribute: AttributeType,
  contentConfiguration?: ?ContentConfigurationResults
};

class FormResultAttribute extends Component<FormResultAttributeProps> {
  getDefaultAttributeConfiguration(): ContentConfigurationElements | null {
    const contentConfiguration = this.props.contentConfiguration;

    if (
      contentConfiguration &&
      contentConfiguration.calculatedResultElements &&
      contentConfiguration.calculatedResultElements.hasConfig()
    ) {
      return contentConfiguration.calculatedResultElements;
    }

    if (
      contentConfiguration &&
      contentConfiguration.resultElements &&
      contentConfiguration.resultElements.hasConfig()
    ) {
      return contentConfiguration.resultElements;
    }

    return null;
  }

  render() {
    const { attribute, id, contentConfiguration } = this.props;

    if (attribute.type === "choice" && attribute.isBoolean) {
      return (
        <FormResultAttributeDecision
          id={id}
          attribute={attribute}
          contentConfiguration={contentConfiguration}
        />
      );
    }

    if (attribute.type === "choice") {
      return (
        <FormResultAttributeClassification
          id={id}
          attribute={attribute}
          contentConfiguration={contentConfiguration}
        />
      );
    }

    const defaultContentConfiguration = this.getDefaultAttributeConfiguration();
    return (
      <FormAttribute
        id={id}
        name={attribute.name}
        attribute={attribute}
        questionContentConfiguration={defaultContentConfiguration}
      />
    );
  }
}

export default FormResultAttribute;
