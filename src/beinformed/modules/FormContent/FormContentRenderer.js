// @flow
import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

import type { Connector } from "react-redux";

import {
  startProgress,
  finishProgress
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";
import { handleError } from "beinformed/modules/Error/redux/ErrorActions";

import FormContentProperties from "beinformed/modules/FormContent/FormContentProperties";
import FormContentTextFragments from "beinformed/modules/FormContent/FormContentTextFragments";
import FormContentSections from "beinformed/modules/FormContent/FormContentSections";

import ModularUI from "beinformed/modularui/ModularUI";

import {
  RENDER_CHILD_SECTIONS,
  RENDER_SECTION_LABEL,
  EMPHASIS,
  HALF_WIDTH,
  PROPERTY_SHOW_WHEN_EMPTY
} from "beinformed/constants/LayoutHints";

import "./FormContentRenderer.scss";

type FormContentRendererProps = {
  concept: ConceptDetailModel | null,
  contentConfiguration?: ContentConfigurationElements | null,
  types: Array<string>,
  onError: (err: Error) => void,
  onFinish: () => void,
  onStart: () => void
};

type FormContentRendererState = {
  isFetching: boolean,
  content: Array<{
    type: string,
    contentModel: ContentModel
  }>
};

/**
 * Fetches content from a concept based on the content configuration received through
 * the contentConfiguration property and the concept model received trough the concept property
 *
 * With the types property specific types can be rendered.
 */
class FormContentRenderer extends Component<
  FormContentRendererProps,
  FormContentRendererState
> {
  static defaultProps = {
    types: ["contentElement", "textFragmentElement", "propertyElement"]
  };

  constructor(props: FormContentRendererProps) {
    super(props);

    this.state = {
      isFetching: false,
      content: []
    };
  }

  componentDidMount() {
    this.retrieveContent();
  }

  retrieveContent() {
    const concept = this.props.concept;
    const contentConfig = this.props.contentConfiguration;

    if (
      !this.state.isFetching &&
      this.props.types.includes("contentElement") &&
      concept &&
      contentConfig &&
      contentConfig.hasContent()
    ) {
      const contentElementConfigs = contentConfig.byTypes(["contentElement"]);

      const sourceReferences = [];
      if (contentElementConfigs.length > 0) {
        this.setState({
          isFetching: true
        });

        contentElementConfigs.forEach(contentElementConfig => {
          const withChildSections = contentElementConfig.layouthint.has(
            RENDER_CHILD_SECTIONS
          );

          const sourceReferenceRequests = concept.sourceReferenceCollection
            .byTypes(contentElementConfig.types)
            .map(sourceReference => {
              const request = new ModularUI(sourceReference.link.selfhref);

              return request
                .fetchContent(withChildSections)
                .then(contentModel => ({
                  type: sourceReference.type,
                  contentModel
                }));
            });

          sourceReferences.push(...sourceReferenceRequests);
        });

        this.props.onStart();
        Promise.all(sourceReferences)
          .then(content => {
            this.setState({
              isFetching: false,
              content
            });

            return this.props.onFinish();
          })
          .catch(err => this.props.onError(err));
      }
    }
  }

  contentRender(config: Object, concept: ConceptDetailModel, index: number) {
    const contentClass = classNames({
      emphasis: config.layouthint.has(EMPHASIS),
      "col-6": config.layouthint.has(HALF_WIDTH)
    });

    switch (config.type) {
      case "contentElement":
        if (this.state.content.length > 0) {
          return (
            <FormContentSections
              key={`${config.type}-${index}`}
              className={contentClass}
              content={this.state.content
                .filter(contentItem => config.types.includes(contentItem.type))
                .map(contentItem => contentItem.contentModel)}
              renderChildSections={config.layouthint.has(RENDER_CHILD_SECTIONS)}
              renderSectionLabel={config.layouthint.has(RENDER_SECTION_LABEL)}
            />
          );
        }
        return null;
      case "textFragmentElement":
        return (
          <FormContentTextFragments
            key={`${config.type}-${index}`}
            className={contentClass}
            textfragments={concept.getTextFragmentByKeys(config.types)}
          />
        );
      case "propertyElement":
        return (
          <FormContentProperties
            key={`${config.type}-${index}`}
            className={contentClass}
            properties={concept.getConceptPropertiesByIds(config.types)}
            renderEmpty={config.layouthint.has(PROPERTY_SHOW_WHEN_EMPTY)}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const contentConfig = this.props.contentConfiguration;
    const concept = this.props.concept;

    if (!contentConfig || !concept) {
      return null;
    }

    const content = contentConfig
      .byTypes(this.props.types)
      .map((config, i) => this.contentRender(config, concept, i));

    if (content.length === 0) {
      return null;
    }

    return <div className="content">{content}</div>;
  }
}

/**
 * Map state to props
 */
type ownPropsProps = {
  concept: ConceptDetailModel | null,
  contentConfiguration?: ContentConfigurationElements | null,
  types?: Array<string>
};
const mapStateToProps = (state: State, ownProps: ownPropsProps) => ownProps;

const connector: Connector<
  ownPropsProps,
  FormContentRendererProps
> = connect(mapStateToProps, {
  onStart: startProgress,
  onFinish: finishProgress,
  onError: handleError
});

export default connector(FormContentRenderer);
