// @flow
/* global dataFetcher */
import { BASE } from "beinformed/constants/Constants";

/**
 * Fetch data from server (uses nashorn and datafetcher).
 */
export default function serverFetch(args: Object): Object {
  // remove contextPath of url, when the request is internal the context path is not needed
  const urlNoBase = args.url.includes("http")
    ? args.url
    : args.url.replace(BASE, "");
  const params = args.params
    ? args.params.replace("includeContext=true", "")
    : "";
  const url = params === "" ? urlNoBase : `${urlNoBase}?${params}`;

  // const data = dataFetcher.fetcher(url, includeContext)
  const data = dataFetcher.fetch(url, args);

  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
}
