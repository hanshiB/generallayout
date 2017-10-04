// @flow
import {
  IS_SYNC,
  MODULARUI_ROUTEPROVIDER
} from "beinformed/constants/Constants";
import universalFetch from "beinformed/util/fetch/universalFetch";
import Href from "beinformed/models/href/Href";

type RouteproviderRoute = {
  viewtype: string,
  resources: Array<{
    [resourceKey: string]: string
  }>
};
type RouteproviderResponse = {
  [routePart: string]: RouteproviderRoute
};

/**
 * Get the base route based on route configuration and requested href
 * this is a bit doubtful, we assume that the route that has an equal amount of /
 * with the url is the route for the currently requested url.
 */
const getBaseRoute = (routes: Array<string>, href: Href): string | null => {
  const hrefParts = href.path.split("/");
  return (
    routes.find(
      route => hrefParts.length - 1 === route.split("/").length - 1
    ) || null
  );
};

/**
 * Retrieve the route with the most / in it's path.
 */
const getLongestRoute = (routes: Array<string>): string =>
  routes.reduce(
    (prevRoute, currentRoute) =>
      prevRoute.split("/").length > currentRoute.split("/").length
        ? prevRoute
        : currentRoute
  );

/**
 * Maps a concept service route,
 * this is special because the (knowledge-model-identifier) part contains slashes (/).
 */
const conceptHrefParts = (route: string, path: string) => {
  const re = /\/concepts\/(.*\.bixml)\/?(.*)?/gi;
  const parts = re.exec(path);

  const hrefParts = [""];

  if (parts !== null) {
    hrefParts.push("concepts");

    if (parts.length > 1) {
      hrefParts.push(parts[1]);
    }

    if (parts.length > 2) {
      hrefParts.push(parts[2]);
    }
  }

  return hrefParts;
};

/**
 * Retrieve key value pairs for all placeholders in route
 */
const getRouteParamMap = (route: string, href: Href) => {
  const hrefParts =
    href.path.indexOf("/concepts") === 0
      ? conceptHrefParts(route, href.path)
      : href.path.split("/");
  const routeParts = route.split("/");

  return routeParts
    .map((routePart, i) => ({
      key: routePart,
      value: hrefParts.length > i ? hrefParts[i] : ""
    }))
    .filter(
      routeParam => routeParam.key !== "" && routeParam.key !== routeParam.value
    );
};

/**
 * Add querystrings available in href to each route, based on resource key
 */
const getRoutesWithQuerystring = (routeInformation, href) =>
  Object.keys(routeInformation)
    .sort((a, b) => b.length - a.length)
    .map((route, i) => {
      const routeKey = Object.keys(routeInformation[route].resources[0])[0];
      const querystring = href.getQuerystringForModularUI(routeKey);
      return querystring !== "" && i === 0 ? `${route}?${querystring}` : route;
    });

/**
 * Replace placeholders with actual value
 */
const replacePlaceholders = (route, paramMap) => {
  let replacedRoute = route;

  paramMap.forEach(param => {
    // creates a regex to replace placeholders
    const escapedKey = param.key.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

    const re = new RegExp(`${escapedKey}`, "g");

    replacedRoute = replacedRoute.replace(re, param.value);
  });
  return replacedRoute;
};

/**
 * Map parameters / placeholders in route definitions to input parameters on url,
 * this converts a route like /books/book/(case-id), to /books/book/24
 */
const mapCachedRoute = (
  href: Href,
  routeInformation: RouteproviderResponse
): Array<Href> => {
  if (typeof routeInformation !== "object" || routeInformation === null) {
    return [];
  }

  const routes = Object.keys(routeInformation);

  const routeWithPlaceholders =
    getBaseRoute(routes, href) || getLongestRoute(routes);

  if (typeof routeWithPlaceholders === "undefined") {
    return [];
  }

  const paramMap = getRouteParamMap(routeWithPlaceholders, href);

  const routesWithQuerystring = getRoutesWithQuerystring(
    routeInformation,
    href
  );

  const finalRoutes = routesWithQuerystring.map(route =>
    replacePlaceholders(route, paramMap)
  );

  return finalRoutes.map(route => new Href(route));
};

/**
 * Retrieves an array of routes that are in context for the given href
 */
const routeprovider = (href: Href): Array<Href> | Promise<Array<Href>> => {
  const routeproviderPath = MODULARUI_ROUTEPROVIDER + href.path;

  const fetchedRouteInformation = universalFetch({
    url: routeproviderPath,
    includeContext: true
  });

  if (IS_SYNC) {
    return mapCachedRoute(href, fetchedRouteInformation);
  }

  return fetchedRouteInformation.then(routeInformation => {
    if (routeInformation !== null && typeof routeInformation === "object") {
      return mapCachedRoute(href, routeInformation);
    }

    return [];
  });
};

export default routeprovider;
