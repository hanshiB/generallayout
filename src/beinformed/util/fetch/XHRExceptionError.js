// @flow

/**
 * XMLHttpRequest Exception information
 */
class XHRExceptionError extends Error {
  xhr: XMLHttpRequest;
  status: number;
  response: ErrorResponseJSON;
  id: string;
  parameters: any;
  action: any;

  constructor(failedXhr: XMLHttpRequest, response: ErrorResponseJSON) {
    const errorMessage =
      response.error &&
      response.error.properties &&
      response.error.properties.message
        ? response.error.properties.message
        : "XHRExceptionError";

    super(errorMessage);

    this.name = "XHRExceptionError";
    this.xhr = failedXhr;
    this.status = failedXhr.status;
    this.response = response;

    this.id = response.error ? response.error.id : "XHRExceptionError";

    this.parameters =
      response.error && response.error.parameters
        ? response.error.parameters
        : null;
    this.action =
      response.error && response.error.action ? response.error.action : null;
  }
}

export default XHRExceptionError;
