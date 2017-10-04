// @flow
/**
 * Indicates if contributions and routeprovider should be cached
 */
export const USE_CACHE = true;

/**
 * Path to backend
 */
// When requesting a remote server with CORS enabled, add the origin, for example:
// export const BEINFORMED_PATH = 'http://192.168.128.61:8080/BeInformed';
export const BEINFORMED_PATH = "/BeInformed";

/**
 * Path to modular ui data service
 * When requesting directly to the camel route: `${BEINFORMED_PATH}/restServices/ui`;
 */
export const MODULARUI_DATA = BEINFORMED_PATH;

/**
 * Path to the contributions api end point
 * /contributions uri part is added through the _links in the data service
 */
export const MODULARUI_CONTRIBUTIONS = BEINFORMED_PATH;

/**
 * Path to route provider
 * The route provider provides dynamic application information about the requested path and
 * what components are mapped to the various uri parts in the requested path
 */
export const MODULARUI_ROUTEPROVIDER = `${BEINFORMED_PATH}/routeprovider`;

/**
 * Base web client / web server path
 * @type {string}
 */
export const BASE = "/BeInformed";

/**
 * Application uri
 * @type {string}
 */
const APPLICATION_URI = "/Webapp";

/**
 * Base Path
 * @type {string}
 */
export const APPLICATION_PATH = BASE + APPLICATION_URI;

export const CONTENT_PATH = `${BEINFORMED_PATH}/content`;

/**
 * Upload Path
 * @type {string}
 */
export const UPLOAD_PATH = `${BEINFORMED_PATH}/uploadFile`;

/**
 * Separator for parameters of a list, makes it possible to render multiple lists on a page in a non-js environment
 * @type {string}
 */
export const PARAMETER_SEPARATOR = "~";

/**
 * Model Catalog & Source Browser
 */
export const TIMEVERSION_FILTER_NAME = "entryDate";

/**
 * Parameter name for the viewtype toggle
 * @type {string}
 */
const PARAMETER_OVERVIEW_VIEWTYPE = "viewType";
export const UI_PARAMETERS = [PARAMETER_OVERVIEW_VIEWTYPE];

export const ISO_DATE_FORMAT = "YYYY-MM-DD";
export const ISO_TIME_FORMAT = "HH:mm:ss";
export const ISO_TIMESTAMP_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSS";

// Timeout settings
export const HIDE_NOTIFICATION_TIMEOUT = 3000;

export const NOTIFICATION_MSG_MAP = {
  create: "Notification.Msg.Create",
  update: "Notification.Msg.Update",
  delete: "Notification.Msg.Delete"
};

// Key codes
export const KEYCODES = {
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40
};

export const IS_SYNC = typeof dataFetcher !== "undefined";

export const SUCCESS = "SUCCESS";
export const INFO = "INFO";
export const WARNING = "WARNING";
export const ERROR = "ERROR";

// FORMS
export const ALWAYS_COMMIT_FORM = false;

export const HORIZONTAL_FORM_LABEL_CLASS = "col-sm-4";

/**
 * Constants file
 */
export default {
  APPLICATION_PATH,
  NO_EVENT_EMIT: false
};
