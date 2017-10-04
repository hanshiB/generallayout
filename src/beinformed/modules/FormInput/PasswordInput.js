// @flow
import React, { Component } from "react";

import TextInput from "beinformed/modules/FormInput/TextInput";

import type LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

import "./PasswordInput.scss";

type PasswordInputProps = {
  ariaLabel?: string,
  ariaLabelledBy?: string,
  className?: string,
  disabled?: boolean,
  id?: string,
  isLogin?: boolean,
  name: string,
  placeholder?: string,
  readOnly?: boolean,
  value: string,
  layouthint?: LayoutHintCollection,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

type PasswordInputState = {
  score: number,
  suggestions: [],
  warning: string
};

/**
 * Render password input
 */
class PasswordInput extends Component<PasswordInputProps, PasswordInputState> {
  _zxcvbn: null | any;

  static defaultProps = {
    value: "",
    isLogin: false
  };

  /**
   * Construct password input
   */
  constructor(props: PasswordInputProps) {
    super(props);

    this.state = {
      score: -1,
      suggestions: [],
      warning: ""
    };
  }

  /**
   * Async load zxcvbn for password strength meter
   */
  componentDidMount() {
    if (!this.props.isLogin && (!this._zxcvbn || this._zxcvbn === null)) {
      this._zxcvbn = null;

      // don't do anything when request of zxcvbn fails, just don't show password hints
      // this uses webpack dynamic imports: https://webpack.js.org/guides/code-splitting-import/#dynamic-import
      import(/* webpackChunkName: "zxcvbn" */ "zxcvbn") // eslint-disable-line no-inline-comments
        .then(module => {
          this._zxcvbn = module;

          return module;
        })
        .catch();
    }
  }

  /**
   * Set strength information on password change
   */
  handleChange = (inputvalue: string) => {
    if (!this.props.isLogin && this._zxcvbn) {
      const strength = this._zxcvbn(inputvalue);

      this.setState({
        score: strength.score,
        warning: strength.feedback.warning,
        suggestions: strength.feedback.suggestions
      });
    }

    this.props.onChange(inputvalue);
  };

  renderPasswordInformation(isLogin?: boolean) {
    if (!isLogin) {
      const strengths = ["Bad", "Weak", "Good", "Strong", "Great"];

      return (
        <div className="password-info">
          <div className={`password-strength strength-${this.state.score}`}>
            .
          </div>
          {this.state.score > -1 && (
            <div className="password-explain">
              <span>{`Strength: ${strengths[this.state.score]}.`}</span>
              <span className="text-danger">{this.state.warning}</span>
            </div>
          )}
          {this.state.suggestions.length > 0 && (
            <ul className="password-suggestions list-unstyled">
              {this.state.suggestions.map((suggestion, i) => (
                <li key={i}>{suggestion}</li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    return null;
  }

  /**
   * render
   */
  render() {
    const { isLogin, ...props } = this.props;

    return (
      <div className="small text-muted">
        <TextInput
          {...props}
          type="password"
          autoComplete="new-password"
          onChange={this.handleChange}
        />
        {this.renderPasswordInformation(isLogin)}
      </div>
    );
  }
}

export default PasswordInput;
