// @flow
import type LinkCollection from "beinformed/models/links/LinkCollection";
import type LinkModel from "beinformed/models/links/LinkModel";

import CaseSearchModel from "beinformed/models/search/CaseSearchModel";
import TaskGroupCollection from "beinformed/models/taskgroup/TaskGroupCollection";
import ResourceModel from "beinformed/models/base/ResourceModel";
import TaskGroupModel from "beinformed/models/taskgroup/TaskGroupModel";
import ActionCollection from "beinformed/models/actions/ActionCollection";

import type ModularUIResponse from "beinformed/modularui/ModularUIResponse";

/**
 * Describes a TabModel
 */
export default class TabModel extends ResourceModel {
  _search: CaseSearchModel | null;
  _taskGroupCollection: TaskGroupCollection;
  _actionCollection: ActionCollection;

  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._actionCollection = new ActionCollection(
      this.data.actions,
      this.contributions.actions
    );
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "Tab";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      (data.contributions.resourcetype.endsWith("Tab") ||
        data.contributions.resourcetype.endsWith("KnowledgeBank"))
    );
  }

  /**
  * @override
  */
  getInitialChildModelLinks(): LinkModel[] {
    return this.links.getLinksByGroup("taskgroup", "search", "actions").all;
  }

  /**
  * @override
  */
  setChildModels() {
    this.taskGroupCollection = this.childModels.filter(
      model => model.type === "TaskGroup"
    );

    const caseSearch = this.childModels.find(
      model => model.type === "CaseSearch"
    );

    if (caseSearch) {
      this._search = caseSearch;
    }
  }

  /**
  * Getting the taskgrouppanels on the tab
  */
  get taskGroupCollection(): TaskGroupCollection {
    return this._taskGroupCollection;
  }

  /**
  * Setting the taskgroup panel collection
  */
  set taskGroupCollection(taskgroups: TaskGroupModel[]) {
    this._taskGroupCollection = new TaskGroupCollection(taskgroups);
  }

  /**
   * Get search model
   */
  get search(): CaseSearchModel | null {
    return this._search;
  }

  /**
   * Set search model
   */
  set search(search: CaseSearchModel | null) {
    this._search = search;
  }

  /**
   * Getting the label of the tab
   */
  get label(): string {
    return this.contributions.label || "";
  }

  /**
   * Getting the component links on the tab
   */
  get components(): LinkCollection {
    return this.links.getLinksByGroup("component", "search");
  }

  get actionCollection(): ActionCollection {
    return this._actionCollection;
  }
  /**
   * Has component links
   */
  hasComponents() {
    return this.components.size > 0;
  }

  /**
   * Has taskgroups
   */
  hasTaskGroups() {
    return this.taskGroupCollection && this.taskGroupCollection.hasItems;
  }

  hasActions() {
    return this.actionCollection && this.actionCollection.hasItems;
  }

  /**
   * Indicates if case search is enabled
   */
  hasSearch() {
    return typeof this._search !== "undefined" && this._search !== null;
  }

  /**
   * Inidicates if quick search fields are available
   */
  hasQuickSearch() {
    if (this._search) {
      return this._search.getQuickSearchFilters().length > 0;
    }

    return false;
  }
}
