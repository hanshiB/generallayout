// @flow
import React from "react";
import classNames from "classnames";

import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import type ContentModel from "beinformed/models/content/ContentModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
import FormContentRenderer from "beinformed/modules/FormContent/FormContentRenderer";
import IconPopover from "beinformed/modules/Popover/IconPopover";
import { POPUP } from "beinformed/constants/LayoutHints";

import { HORIZONTAL_FORM_LABEL_CLASS } from "beinformed/constants/Constants";

import "./FormLabel.scss";

type FormLabelProps = {
  className?: string,
  concept?: ConceptDetailModel | null,
  content?: Map<string, ContentModel>,
  contentConfiguration?: ContentConfigurationElements | null,
  defaultLabel: string,
  htmlFor: string,
  isMandatory?: boolean,
  formLayout?: "vertical" | "horizontal"
};

/**
 * Render label
 */
const FormLabel = ({
  defaultLabel,
  concept,
  content,
  contentConfiguration,
  isMandatory = false,
  className,
  htmlFor,
  formLayout
}: FormLabelProps) => {
  /**
   * Retrieve the first permitted label to render when a concept and contentConfiguration is available
   * Be aware that permission could be in place for labels from a concept.
   */
  const getLabel = () => {
    const configuredLabelProperties =
      contentConfiguration && contentConfiguration.labelConfig.length > 0
        ? contentConfiguration.labelConfig[0].types
        : [];

    if (concept && configuredLabelProperties.length > 0) {
      const configuredLabels = concept
        .getLabelElementByIds(configuredLabelProperties)
        .filter(
          configuredLabel =>
            configuredLabel.value && configuredLabel.value !== ""
        );

      if (configuredLabels.length > 0) {
        return configuredLabelProperties
          .filter(
            configuredLabelProperty =>
              typeof configuredLabels.find(
                configuredLabel =>
                  configuredLabel._id === configuredLabelProperty
              ) !== "undefined"
          )
          .map(configuredLabelProperty =>
            configuredLabels.find(
              configuredLabel => configuredLabel._id === configuredLabelProperty
            )
          )[0].value;
      }
    }

    return defaultLabel;
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label
      className={classNames(
        "form-label",
        {
          [HORIZONTAL_FORM_LABEL_CLASS]: formLayout === "horizontal",
          "col-12": formLayout !== "horizontal"
        },
        className
      )}
      htmlFor={htmlFor}
      id={`${htmlFor}-label`}
    >
      {getLabel() + (isMandatory ? " *" : "")}
      {concept &&
        content &&
        contentConfiguration &&
        contentConfiguration.hasLayoutHint(POPUP) && (
          <IconPopover className="form-label-popover">
            <FormContentRenderer
              concept={concept}
              contentConfiguration={contentConfiguration.includeLayoutHints([
                POPUP
              ])}
            />
          </IconPopover>
        )}
    </label>
  );
};

export default FormLabel;
