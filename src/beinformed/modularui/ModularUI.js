// @flow
import {
  MODULARUI_CONTRIBUTIONS,
  MODULARUI_DATA,
  TIMEVERSION_FILTER_NAME
} from "beinformed/constants/Constants";

import Href from "beinformed/models/href/Href";

import universalFetch from "beinformed/util/fetch/universalFetch";
import resolveModel from "beinformed/modularui/resolveModel";

import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import type ListItemModel from "beinformed/models/list/ListItemModel";

/**
 * Helper for fetching data and contributions from the Be Informed modular ui
 * and merge it into a target or resolvable model.
 */

class ModularUIRequest {
  _response: ModularUIResponse;

  _href: Href;
  _options: Object;
  _targetModel: Class<ResolvableModels>;
  _contributionsHref: string;
  _locale: string;

  _listitem: ListItemModel;

  _progressEvent: ?Function;

  constructor(href: Href, options: Object = {}) {
    this._response = new ModularUIResponse();

    this.href = href;
    this.options = options;
  }

  set locale(locale: string) {
    this._locale = locale;
    this._response.locale = locale;
  }

  get locale(): string {
    return this._locale;
  }

  setLocale(locale: string) {
    this.locale = locale;

    return this;
  }

  get response(): ModularUIResponse {
    return this._response;
  }

  set href(href: Href) {
    this._href = href;
  }

  get href(): Href {
    return this._href;
  }

  get options(): Object {
    return {
      ...this._options,
      locale: this.locale
    };
  }

  set options(options: Object) {
    this._options = options;
  }

  set listitem(listitem: ListItemModel) {
    this._listitem = listitem;
  }

  get listitem(): ListItemModel {
    return this._listitem;
  }

  get withChildModels(): boolean {
    return (
      !("childmodels" in this.options) || this.options.childmodels === true
    );
  }

  set targetModel(targetModel: Class<ResolvableModels>) {
    this._targetModel = targetModel;
  }

  get targetModel(): Class<ResolvableModels> {
    return this._targetModel;
  }

  createModel(): ResolvableModels {
    const Model = this.targetModel || resolveModel(this.response);

    if (Model) {
      const model = new Model(this.response);

      // add lisitem for list detail panels
      if (this.listitem) {
        model.listitem = this.listitem;
      }

      return model;
    }

    throw new Error(
      `No model available for data: ${JSON.stringify(this.response)}`
    );
  }

  processContributionsService(data: Object) {
    const key = Object.keys(data)[0];

    if (key === "error") {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: data.error.properties.message,
        resource: `${MODULARUI_DATA}${this.href.path.toString()}`,
        trace: data.error.properties.trace
      };
    }

    this.response.key = key;
    this.response.contributions = data[key];
  }

  processDataService(data: Object) {
    const key = Object.keys(data)[0];

    if (key === "error") {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: data.error.properties.message,
        resource: `${MODULARUI_DATA}${this.href.path.toString()}`,
        trace: data.error.properties.trace
      };
    }

    this.response.data = data[key];

    if (data[key]._links && data[key]._links.contributions) {
      this._contributionsHref = data[key]._links.contributions.href;
    } else {
      throw new Error(`Contributions link not found for data with key ${key}`);
    }
  }

  fetchContributionsService() {
    return universalFetch({
      url: `${MODULARUI_CONTRIBUTIONS}${this._contributionsHref}`,
      cache: true,
      locale: this.options.locale
    });
  }

  fetchDataService() {
    return universalFetch({
      ...this.options,
      url: `${MODULARUI_DATA}${this.href.path}`,
      params: this.href.getQuerystringForModularUI(),
      onProgress: this.onProgress
    });
  }

  set onProgress(progressEvent: Function) {
    this._progressEvent = progressEvent;
  }

  get onProgress(): Function | null {
    return this._progressEvent || null;
  }

  fetch() {
    return this.fetchDataService()
      .then((data: Object) => {
        this.processDataService(data);

        return this.fetchContributionsService();
      })
      .then((contributionsData: Object) => {
        this.processContributionsService(contributionsData);

        return Promise.resolve(this.createModel());
      })
      .then(model => {
        if (this.withChildModels) {
          return this.fetchChildModels(model);
        }

        return model;
      });
  }

  fetchServer() {
    const fetchedData = this.fetchDataService();
    this.processDataService(fetchedData);

    const contributionsData = this.fetchContributionsService();
    this.processContributionsService(contributionsData);

    const model = this.createModel();

    if (this.withChildModels) {
      return this.fetchServerChildModels(model);
    }

    return model;
  }

  fetchServerChildModels(model: ResolvableModels) {
    const childModelLinks = model.getInitialChildModelLinks();
    if (childModelLinks.length > 0) {
      const childmodels = childModelLinks.map(childModelLink => {
        const request = new ModularUIRequest(childModelLink.href);

        request.locale = this.locale;

        if (childModelLink.targetModel) {
          request.targetModel = childModelLink.targetModel;
        }

        return request.fetchServer();
      });

      model.addChildModels(childmodels);
    }

    return model;
  }

  fetchFromCache() {
    this.options = {
      ...this.options,
      cache: true
    };

    return this.fetch();
  }

  fetchChildModels(model: ResolvableModels): Promise<any> {
    const childModelLinks = model.getInitialChildModelLinks();

    const childModelRequests = childModelLinks.map(childModelLink => {
      const request = new ModularUIRequest(childModelLink.href);

      request.locale = this.locale;

      if (childModelLink.targetModel) {
        request.targetModel = childModelLink.targetModel;
      }

      if (childModelLink.isCacheable) {
        return request.fetchFromCache();
      }

      return request.fetch();
    });

    return Promise.all(childModelRequests).then(childModels => {
      model.addChildModels(childModels);

      return model;
    });
  }

  fetchContent(withChildSections: boolean) {
    return this.fetchFromCache().then(model => {
      if (withChildSections && model.childSectionLinks.length > 0) {
        return this.fetchContentChildSections(model);
      }

      return Promise.resolve(model);
    });
  }

  /**
   * Recursively return child sections defined on the content model
   */
  fetchContentChildSections(contentModel: ContentModel): Promise<any> {
    const newContentModel = contentModel.clone();

    return Promise.all(
      contentModel.childSectionLinks.map(childSectionLink => {
        const contentHrefWithEntryDate = childSectionLink.selfhref.addParameter(
          TIMEVERSION_FILTER_NAME,
          contentModel.entryDate
        );

        const request = new ModularUIRequest(contentHrefWithEntryDate);

        return request.fetchContent(true);
      })
    ).then(sectionModels => {
      newContentModel.childSections = sectionModels;

      return newContentModel;
    });
  }
}

export default ModularUIRequest;
