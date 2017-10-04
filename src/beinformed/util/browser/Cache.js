// @flow
/**
 * Manage the browser cache
 */
class Cache {
  _cache: typeof sessionStorage;

  /**
   * constructor
   */
  constructor() {
    if (typeof sessionStorage !== "undefined") {
      this._cache = sessionStorage;
    }
  }

  /**
   * Create a key that can be used to cache resources, needs the request arguments and uses url, params and header of the request args
   * to create a key that is unique for time versions and locale
   */
  createResourceKey(requestArgs: Object): string {
    let resourceKey = requestArgs.url;

    if (requestArgs.params) {
      resourceKey += `|${requestArgs.params}`;
    }

    if (requestArgs.locale) {
      resourceKey += `|${requestArgs.locale}`;
    }

    return resourceKey;
  }

  /**
   * Get a cached item by it's key
   */
  getItem(key: string) {
    const cache = this._cache;

    if (!cache) {
      return null;
    }

    const cacheItem = cache.getItem(key);

    if (!cacheItem) {
      return null;
    }

    try {
      return JSON.parse(cacheItem);
    } catch (err) {
      return this._cache.getItem(key);
    }
  }

  /**
   * Check if the item with key exists in the browser cache
   */
  hasItem(key: string) {
    return this.getItem(key) !== null;
  }

  /**
   * Add an item to the cache
   */
  addItem(key: string, value: string | Object) {
    const sValue = typeof value === "string" ? value : JSON.stringify(value);

    this._cache.setItem(key, sValue);
  }

  removeItem(key: string) {
    this._cache.removeItem(key);
  }

  /**
   * Clear complete cache storage
   */
  clear() {
    if (!this._cache) {
      return;
    }
    this._cache.clear();
  }
}

export default new Cache();
