// @flow
import React, { Component } from "react";
import classNames from "classnames";

import Icon from "beinformed/modules/Icon/Icon";
import Popover from "beinformed/modules/Popover/Popover";
import { KEYCODES } from "beinformed/constants/Constants";

import "./IconPopover.scss";

type IconPopoverProps = {
  children?: any,
  className?: string,
  icon: string
};

type IconPopoverState = {
  popoverVisible: boolean,
  keepOpen: boolean
};

/** render an icon with a popover text */
class IconPopover extends Component<IconPopoverProps, IconPopoverState> {
  static defaultProps = {
    icon: "question-circle-o"
  };

  /**
   * Construct IconPopover
   */
  constructor(props: IconPopoverProps) {
    super(props);

    this.state = {
      popoverVisible: false,
      keepOpen: false
    };
  }

  /**
   * componentWillUnmount, removes document wide click event observer
   */
  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  }

  /**
   * Event that is triggert mouse leaves the error button
   */
  handleMouseLeave = () => {
    if (!this.state.keepOpen) {
      this.setState({
        popoverVisible: false
      });
    }
  };

  /**
   * Event that is triggert mouse enters the error button
   */
  handleMouseEnter = () => {
    this.setState({
      popoverVisible: true
    });
  };

  handleMouseClick = () => {
    if (this.state.keepOpen) {
      return;
    }

    this.setState({
      popoverVisible: true,
      keepOpen: true
    });

    window.addEventListener("click", this.handleDocumentClick);
  };

  handleKeyDown = (e: KeyboardEvent) => {
    if ([KEYCODES.ENTER, KEYCODES.SPACE].includes(e.keyCode)) {
      e.preventDefault();

      this.setState({
        popoverVisible: !this.state.popoverVisible
      });
    }
  };

  /**
   * Handling click outside the datetime picker
   */
  handleDocumentClick = () => {
    this.setState({
      popoverVisible: false,
      keepOpen: false
    });

    window.removeEventListener("click", this.handleDocumentClick);
  };

  render() {
    return (
      <span
        className={classNames("icon-popover", this.props.className)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleMouseClick}
        onKeyDown={this.handleKeyDown}
        tabIndex="0"
        role="button"
        aria-haspopup="true"
        aria-expanded={this.state.popoverVisible}
      >
        <Icon name={this.props.icon} />
        {this.state.popoverVisible && (
          <Popover alignment="right bottom">{this.props.children}</Popover>
        )}
      </span>
    );
  }
}

export default IconPopover;
