// @flow
class ModularUIResponse {
  _key: string;
  _data: any;
  _contributions: any;
  _locale: string;

  constructor() {
    this._data = {};
    this._contributions = {};
    this._key = "unknown";
    this._locale = "EN";
  }

  set locale(locale: string) {
    this._locale = locale;
  }

  get locale(): string {
    return this._locale;
  }

  set key(key: string) {
    this._key = key;
  }

  get key(): string {
    return this._key;
  }

  set data(data: any) {
    this._data = data;
  }

  get data(): any {
    return this._data;
  }

  set contributions(contributions: any) {
    this._contributions = contributions;
  }

  get contributions(): any {
    return this._contributions;
  }
}

export default ModularUIResponse;
