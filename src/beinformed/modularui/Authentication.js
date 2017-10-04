// @flow
import universalFetch from "beinformed/util/fetch/universalFetch";
import Cache from "beinformed/util/browser/Cache";

import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";

import ErrorResponse from "beinformed/models/error/ErrorResponse";

import { BEINFORMED_PATH } from "beinformed/constants/Constants";

import type Href from "beinformed/models/href/Href";

const LOGIN_PATH = `${BEINFORMED_PATH}/login`;

class Authentication {
  _inProgress: boolean;
  _inError: boolean;
  _error: ErrorResponse | null;
  _redirectHref: Href;
  _isBasicAuthentication: boolean;
  _username: StringAttributeModel;
  _password: PasswordAttributeModel;

  constructor() {
    this._inProgress = false;
    this._error = null;
    this._username = new StringAttributeModel(
      { key: "username", value: "" },
      { label: "Username", type: "string" }
    );
    this._password = new PasswordAttributeModel(
      { key: "password", value: "" },
      { label: "Password", type: "string", layouthint: ["password"] }
    );
  }

  set inProgress(inProgress: boolean) {
    this._inProgress = inProgress;
  }

  get inProgress(): boolean {
    return this._inProgress;
  }

  set redirectHref(redirectHref: Href) {
    this._redirectHref = redirectHref;
  }

  get redirectHref(): Href {
    return this._redirectHref;
  }

  set isBasicAuthentication(isBasicAuthentication: boolean) {
    this._isBasicAuthentication = isBasicAuthentication;
  }

  get isBasicAuthentication(): boolean {
    return this._isBasicAuthentication;
  }

  get username(): StringAttributeModel {
    return this._username;
  }

  set username(username: StringAttributeModel) {
    this._username = username;
  }

  get password(): PasswordAttributeModel {
    return this._password;
  }

  set password(password: PasswordAttributeModel) {
    this._password = password;
  }

  updateUsername(username: string) {
    this.username = this.username.update(username);
  }

  updatePassword(password: string) {
    this.password = this.password.update(password);
  }

  static startLogin() {
    return universalFetch({
      url: LOGIN_PATH
    }).catch(err => {
      const authError = new ErrorResponse(err);

      const authentication = new this();
      authentication.isBasicAuthentication = authError.isBasicAuthentication;
      authentication.redirectHref = authError.responseURL;
      authentication.inProgress = true;

      return authentication;
    });
  }

  get error(): ErrorResponse | null {
    return this._error;
  }

  get inError(): boolean {
    return this.error !== null;
  }

  set error(error: ErrorResponse | null) {
    this._error = error;
  }

  createLoginArguments(username: string, password: string) {
    if (this.isBasicAuthentication) {
      return {
        url: this.redirectHref.absolutehref
      };
    }

    return {
      url: LOGIN_PATH,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: `username=${username}&password=${password}`
    };
  }

  login() {
    const username = this.username.value || "";
    const password = this.password.value || "";

    if (this.isBasicAuthentication) {
      Cache.addItem("basic", btoa(`${username}:${password}`));
    }

    const loginArgs = this.createLoginArguments(username, password);

    return universalFetch(loginArgs).then(
      () => {
        this.error = null;
        this.inProgress = false;

        return this;
      },
      err => {
        this.error = new ErrorResponse(err);

        if (this.error.isUnauthorized && this.error.loginFailed) {
          return this;
        }

        throw new Error(err);
      }
    );
  }

  logout() {
    return universalFetch({
      url: `${BEINFORMED_PATH}/Logoff`
    }).then(response => {
      Cache.removeItem("basic");

      return response;
    });
  }

  /**
   * Returns a clone of the model (this is not a deep copy)
   */
  clone(): any {
    const originalPrototype = Object.getPrototypeOf(this);

    return Object.assign(Object.create(originalPrototype), this);
  }
}

export default Authentication;
