declare class dataFetcher {
  static fetch(url: string, options?: Object): any;
}

declare type HttpServletRequestJava = {
  getQueryString(): string | null,
  getPathInfo(): string,
  getHeader(name: string): string | null
};
