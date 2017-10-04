// @flow
import type Href from "beinformed/models/href/Href";
import type LinkModel from "beinformed/models/links/LinkModel";

import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import ListItemCollection from "beinformed/models/list/ListItemCollection";
import ListDetailModel from "beinformed/models/list/ListDetailModel";
import ActionCollection from "beinformed/models/actions/ActionCollection";
import ContextModel from "beinformed/models/context/ContextModel";
import FilterCollection from "beinformed/models/filters/FilterCollection";
import GroupingModel from "beinformed/models/grouping/GroupingModel";
import ListHeaderModel from "beinformed/models/list/ListHeaderModel";
import ListHref from "beinformed/models/href/ListHref";
import ListItemModel from "beinformed/models/list/ListItemModel";
import PagingModel from "beinformed/models/paging/PagingModel";
import ResourceModel from "beinformed/models/base/ResourceModel";
import SortingModel from "beinformed/models/sorting/SortingModel";
import { SHOW_ONE_RESULT_AS_DETAIL } from "beinformed/constants/LayoutHints";

/**
 * Defines a list object
 */
export default class ListModel extends ResourceModel {
  _headers: ListHeaderModel[];
  _paging: PagingModel;
  _filterCollection: FilterCollection;
  _sorting: SortingModel;
  _actionCollection: ActionCollection;
  _context: ContextModel;
  _grouping: GroupingModel;
  _listItemCollection: ListItemCollection;
  _detail: ListDetailModel | null;
  _selfhref: ListHref;

  /**
   * Constructs a list
   */
  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._detail = null;
    this._headers = this.setHeaders();
    this._paging = new PagingModel(this.data.paging, this.contributions.paging);

    this._filterCollection = new FilterCollection(this.data.filter, {
      listkey: this.key,
      filter: this.contributions.filter,
      contexts: this.contributions.contexts,
      dynamicschema: this.data.dynamicschema
    });

    this._sorting = new SortingModel(
      this.data.sorting,
      this.contributions.sorting,
      this.headers,
      this.contributions.contexts
    );

    this._actionCollection = new ActionCollection(
      this.data.actions,
      this.contributions.actions
    );

    this._listItemCollection = this.createListItemCollection();

    this.setSelfHref();

    this._context = new ContextModel(this.key, this.selfhref, this.label);
    this._grouping = new GroupingModel(
      this.data.grouping,
      this.contributions.contexts
    );
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "List";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      (data.contributions.resourcetype.endsWith("List") ||
        data.contributions.resourcetype.endsWith("ListPanel") ||
        [
          "DatastoreRelatedDatastorePanel",
          "list-related-cases",
          "CaseRelatedDataStorePanel",
          "RecordPanel",
          "EventHistoryPanel",
          "NotePanel",
          "AppointmentPanel",
          "DocumentPanel",
          "AssignmentPanel"
        ].includes(data.contributions.resourcetype))
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    if (
      this.layouthint.has(SHOW_ONE_RESULT_AS_DETAIL) &&
      this.listItemCollection.length === 1
    ) {
      return this.listItemCollection.all.map(listItem => {
        const listDetailLink = listItem.selflink;
        listDetailLink.targetModel = ListDetailModel;
        return listDetailLink;
      });
    }

    return [];
  }

  setChildModels() {
    this.childModels.forEach(childModel => {
      if (childModel.type === "ListDetail") {
        this.detail = childModel;
      }
    });
  }

  /**
   * getting context
   */
  get context(): ContextModel {
    return this._context;
  }

  /**
   * set context
   */
  set context(context: ContextModel) {
    this._context = context;
  }

  /**
   * Move existing context to the current context based on selfhref of this list
   */
  moveContext(oldContext: ContextModel) {
    this.context = oldContext.getContextOfHref(this.selfhref);

    return this;
  }

  /**
   * Getting the label of the list
   */
  get label(): string {
    return this.contributions.label;
  }

  /**
   * Getting the introduction text
   */
  get introtext(): string {
    if (this.contributions.texts) {
      const text = this.contributions.texts.find(
        item => item.type === "master"
      );

      return text ? text.text : "";
    }

    return "";
  }

  /**
   * Create a listitem collection from the data and contributions of a list
   */
  createListItemCollection() {
    const listitemCollection = new ListItemCollection();

    if (this.data.hasOwnProperty("_embedded") && this.data._embedded !== null) {
      if (Array.isArray(this.data._embedded)) {
        throw new TypeError(
          `One record panel with multiple tables is not supported, place all types in one panel for the panel with key ${this
            .key}`
        );
      }

      listitemCollection.collection = this.data._embedded.results.map(result =>
        this.createListItem(result)
      );
    }

    return listitemCollection;
  }

  /**
   * Create a ListItem
   */
  createListItem(resultItem: { [string]: ListItemJSON }) {
    const key = Object.keys(resultItem)[0];
    const listitemData = resultItem[key];
    const listitemContributions = this.contributions.results[key];

    if (this.data.dynamicschema) {
      listitemData.dynamicschema = this.data.dynamicschema;
    }

    const listitemModelInput = new ModularUIResponse();
    listitemModelInput.key = key;
    listitemModelInput.data = listitemData;
    listitemModelInput.contributions = listitemContributions;

    return new ListItemModel(listitemModelInput);
  }

  /**
   * Getting the results
   */
  get listItemCollection(): ListItemCollection {
    return this._listItemCollection;
  }

  /**
   * Set results
   */
  set listItemCollection(listItemCollection: ListItemCollection) {
    this._listItemCollection = listItemCollection;
  }

  /**
   * Getting the detail
   */
  get detail(): ListDetailModel | null {
    return this._detail;
  }

  /**
   * Add detail model to the {ListModel}
   */
  set detail(detail: ListDetailModel) {
    const listitem = this.listItemCollection.find(listItem =>
      listItem.selfhref.equals(detail.selfhref)
    );

    if (listitem) {
      detail.listitem = listitem;

      const title = detail.titleAttribute
        ? detail.titleAttribute.readonlyvalue
        : "-";

      // Add entry to context of list
      this.context.addItem(
        this.key,
        this.selfhref,
        detail.selfhref,
        `${this.label}: ${title}`
      );
    }

    this._detail = detail;
    this.setSelfHref();
  }

  /**
   * Retrieve grouping information
   */
  get grouping(): GroupingModel {
    return this._grouping;
  }

  /**
   * Check if list has results
   */
  hasResults(): boolean {
    return this.listItemCollection.hasItems;
  }

  /**
   * Get list item by ID
   */
  getListItemById(id: string | number) {
    return this.listItemCollection.find(result => result.id === id);
  }

  /**
   * Get list item by Href
   */
  getListItemByHref(href: Href) {
    return this.listItemCollection.find(result => result.selfhref.equals(href));
  }

  /**
   * Getting paging information
   */
  get paging(): PagingModel {
    return this._paging;
  }

  /**
   * Getting sorting information
   */
  get sorting(): SortingModel {
    return this._sorting;
  }

  /**
   * Getting the filters
   */
  get filterCollection(): FilterCollection {
    return this._filterCollection;
  }

  /**
   * Indicates if list results are filtered
   */
  isFiltered() {
    return this.filterCollection.hasActiveFilters();
  }

  /**
   * Getting actions
   */
  get actionCollection(): ActionCollection {
    return this._actionCollection;
  }

  /**
   * Contains this model list data
   */
  hasList(): boolean {
    return typeof this.key !== "undefined";
  }

  /**
   * Sets self href from links collection
   */
  setSelfHref() {
    const selfLink = this.links ? this.links.getLinkByKey("self") : null;

    if (selfLink && selfLink !== null && this instanceof ListModel) {
      this._selfhref = new ListHref(selfLink.href, this);
    }
  }

  /**
   * Getting the self link of this list
   */
  get selfhref(): ListHref {
    return this._selfhref;
  }

  get parenthref(): Href | null {
    const parent = this.context.context[this.context.context.length - 1];
    return parent ? parent.href : null;
  }

  /**
   * Getting the headers of this list
   */
  get headers(): ListHeaderModel[] {
    return this._headers;
  }

  /**
   * Set initial headers of list
   */
  setHeaders() {
    const tempHeaders = [];

    if (this.contributions.results) {
      const results = this.contributions.results;

      Object.keys(results).forEach(key => {
        results[key].attributes.forEach(attribute => {
          tempHeaders.push(new ListHeaderModel(attribute));
        });
      });
    }

    return tempHeaders;
  }

  /**
   * Retrieve all actions by type
   */
  getActionsByType(actionType: string) {
    return this.actionCollection.getActionsByType(actionType);
  }
}
