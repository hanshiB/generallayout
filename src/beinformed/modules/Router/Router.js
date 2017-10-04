// @flow
import React, { Component } from "react";

import Href from "beinformed/models/href/Href";

type RouterProps = {
  url: Href,
  componentType: string,
  onPopState: (href: Href) => void,
  renderer: any
};

/**
 * Router configuration
 */
class Router extends Component<RouterProps> {
  /**
   * Handle popstate events to resync the reducers
   */
  componentDidMount() {
    window.addEventListener("popstate", this.handlePopState);
  }

  /**
   * Remove listener for popstate event
   */
  componentWillUnmount() {
    window.removeEventListener("popstate", this.handlePopState);
  }

  /**
   * Handle popstate event
   */
  handlePopState = () => {
    this.props.onPopState(new Href(location.href));
  };

  render() {
    if (!this.props.url) {
      throw new Error("Url must be set to use the Router");
    }

    // sync browser url with the url in the reducer of the router
    if (
      this.props.url !== null &&
      typeof location !== "undefined" &&
      this.props.url.absolutehref !== location.href
    ) {
      history.pushState(null, "", this.props.url.absolutehref);
    }

    const Renderer = this.props.renderer;
    return (
      <div>
        <Renderer
          componentType={this.props.componentType}
          url={this.props.url}
          fullPageForms={this.props.componentType === "Form"}
        />

        {
          this.props.componentType === "FormModal" &&
            <Renderer
              componentType="Form"
              url={this.props.url}
              fullPageForms={false}
            />
        }
      </div>
    );
  }
}

export default Router;
