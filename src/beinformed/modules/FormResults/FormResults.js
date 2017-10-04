// @flow
import React from "react";

import FormResult from "beinformed/modules/FormResults/FormResult";
import type FormObjectCollection from "beinformed/models/form/FormObjectCollection";

type FormResultsProps = {
  results: FormObjectCollection,
  id: string
};

/**
 * Render form results of a form
 */

const FormResults = ({ results, id }: FormResultsProps) => (
  <div>
    {results.all.map(
      formResult =>
        formResult.contentConfiguration.endResults
          ? formResult.contentConfiguration.endResults.config.map(
              (config, i) => {
                const attributes = formResult.attributeCollection.filter(
                  attribute => config.attributes.includes(attribute.key)
                );

                return (
                  <FormResult
                    key={`${id}-${formResult.key}-${i}`}
                    id={`${id}-${formResult.key}`}
                    attributes={attributes}
                    contentConfiguration={config}
                  />
                );
              }
            )
          : null
    )}
    {results.all.map((formResult, j) => {
      // Render result attributes that are not configured through content
      const attributes = formResult.attributeCollection.filter(
        attribute =>
          !formResult.contentConfiguration.isConfiguredIntermediateResultAttribute(
            attribute.key
          ) &&
          !formResult.contentConfiguration.isConfiguredEndResultAttribute(
            attribute.key
          )
      );

      if (attributes.length > 0) {
        return (
          <FormResult
            key={`${id}-${formResult.key}-${j}`}
            id={`${id}-${formResult.key}`}
            attributes={attributes}
          />
        );
      }

      return null;
    })}
  </div>
);

export default FormResults;
