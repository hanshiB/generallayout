// @flow
import Href from "beinformed/models/href/Href";
import type XHRExceptionError from "beinformed/util/fetch/XHRExceptionError";

/**
 * Error response model
 */
export default class ErrorResponse {
  _exception: XHRExceptionError;

  /**
   * Construct ErrorResponse
   */
  constructor(data: XHRExceptionError) {
    this._exception = data;
  }

  /**
   * Return error information
   */
  get exception(): XHRExceptionError {
    return this._exception;
  }

  /**
   * Get request status code
   */
  get status(): number {
    const NO_RESPONSE_CODE = 0;
    const DECIMAL_RADIX = 10;
    return this.exception.status
      ? parseInt(this.exception.status, DECIMAL_RADIX)
      : NO_RESPONSE_CODE;
  }

  /**
   * Return error type information
   */
  get id(): string {
    if (this.isResourceNotFound) {
      return "Error.ResourceNotFound";
    }
    return this.exception.id || "Error.GeneralError";
  }

  get response(): Object {
    return this.exception.response || {};
  }

  /**
   * Return error parameters
   */
  get parameters(): MessageParametersType | null {
    return this.exception.parameters || null;
  }

  get isResourceNotFound(): boolean {
    const RESOURCE_NOT_FOUND_RESPONSE_CODE = 404;

    return this.status === RESOURCE_NOT_FOUND_RESPONSE_CODE;
  }

  /**
   * Check if the error message is an authorization error
   */
  get isUnauthorized(): boolean {
    const UNAUTHORIZED_RESPONSE_CODE = 401;

    const hasUnauthorizedStatus = this.status === UNAUTHORIZED_RESPONSE_CODE;
    const hasUnauthorizedErrorId =
      this.id === "Error.NotAuthorized" ||
      this.id === "Error.Authentication.Required" ||
      this.id === "Error.Authentication.InvalidCredentials";
    const hasLoginAction = this.exception.action
      ? this.exception.action.name === "login"
      : false;

    return hasUnauthorizedStatus || hasUnauthorizedErrorId || hasLoginAction;
  }

  /**
   * When no action information is present in the unauthorized response, for now we assume it is Basic Authentication
   */
  get isBasicAuthentication(): boolean {
    const UNAUTHORIZED_RESPONSE_CODE = 401;
    return (
      this.isUnauthorized &&
      this.status === UNAUTHORIZED_RESPONSE_CODE &&
      this.response.error === "No responseText"
    );
  }

  /**
   * Get response url
   */
  get responseURL(): Href {
    return new Href(this.exception.xhr && this.exception.xhr.responseURL);
  }

  /**
   * Retrieve a failed login attempt
   */
  get loginFailed(): boolean {
    return (
      this.id === "Error.Authentication.Required" ||
      this.id === "Error.Authentication.InvalidCredentials"
    );
  }
}
