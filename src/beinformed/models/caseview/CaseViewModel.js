// @flow
import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import type { PanelType } from "beinformed/models/panels/PanelCollection";
import type LinkModel from "beinformed/models/links/LinkModel";
import {
  OVERVIEW,
  PANELS_AS_TABS,
  STAGESVIEW
} from "beinformed/constants/LayoutHints";
import ContextModel from "beinformed/models/context/ContextModel";
import DetailModel from "beinformed/models/detail/DetailModel";
import Href from "beinformed/models/href/Href";
import PanelCollection from "beinformed/models/panels/PanelCollection";
import TaskGroupCollection from "beinformed/models/taskgroup/TaskGroupCollection";
import TaskGroupModel from "beinformed/models/taskgroup/TaskGroupModel";

/**
 * Model containing the details of one case.
 */
export default class CaseViewModel extends DetailModel {
  _panelCollection: PanelCollection;
  _taskGroupCollection: TaskGroupCollection;
  _context: ContextModel | null;

  /**
   * Constructs case view model
   */
  constructor(caseviewData: ModularUIResponse) {
    super(caseviewData);

    this._panelCollection = new PanelCollection();
    this._taskGroupCollection = new TaskGroupCollection();

    const casename =
      this.casename === null || this.casename.value === null
        ? ""
        : this.casename.value;

    this._context = this.casename
      ? new ContextModel(this.key, this.selfhref, casename)
      : null;
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "CaseView";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "CaseView"
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    const activePanelLink = this.getActivePanelLink();

    if (this.renderPanelsAsTab() && activePanelLink) {
      // When rendering as a tab, add the first panel of the caseview as the current active panel
      return this.links.getLinksByGroup("taskgroup").add(activePanelLink).all;
    }

    return this.links.getLinksByGroup("taskgroup", "panel").all;
  }

  /**
   * Get active panel based on request href. When not available get first panel
   * @return {LinkModel}
   */
  getActivePanelLink() {
    return this.panelCollection.activePanel
      ? this.panelCollection.activePanel.selflink
      : this.links.getLinksByGroup("panel").first;
  }

  /**
   * @override
   */
  setChildModels() {
    this.panelCollection.collection = this.childModels.filter(
      model => model.type === "List" || model.type === "GroupingPanel"
    );

    this.taskGroupCollection = this.childModels.filter(
      model => model.type === "TaskGroup"
    );
  }

  /**
   * Getting the case name
   */
  get casename(): AttributeType | null {
    return this._metadataCollection.getAttributeByKey("casename");
  }

  /**
   * Getting the owner of the case
   */
  get owner(): AttributeType | null {
    return this._metadataCollection.getAttributeByKey("owner");
  }

  /**
   * Getting the state of the case
   */
  get status(): AttributeType | null {
    return this._metadataCollection.getAttributeByKey("state");
  }

  /**
   * Getting the type of the case detail
   */
  get casetype(): AttributeType | null {
    return this._metadataCollection.getAttributeByKey("type");
  }

  /**
   * Check if an introtext exists for this caseview
   * @return {boolean}
   */
  hasIntroText() {
    return this.introtext !== "";
  }

  /**
   * Getting the introduction text configured on the case view
   */
  get introtext(): string {
    if (this.contributions.texts) {
      const text = this.contributions.texts.find(
        item => item.type === "master"
      );

      if (text) {
        return text.text;
      }
    }

    return "";
  }

  /**
   * Getting the self href
   * @return {Href}
   */
  get selfhref(): Href {
    const selfLink = this.links.getLinkByKey("self");

    if (selfLink === null) {
      throw new Error("No self href available");
    }

    return new Href(selfLink.href);
  }

  /**
   * Getting the panel collection
   */
  get panelCollection(): PanelCollection {
    return this._panelCollection;
  }

  /**
   * Setting the panel collection
   */
  set panelCollection(panelCollection: PanelCollection) {
    this._panelCollection = panelCollection;
  }

  /**
   * Setting the taskgroup panel collection
   */
  set taskGroupCollection(taskgroups: TaskGroupModel[]) {
    this._taskGroupCollection = new TaskGroupCollection(taskgroups);
  }

  /**
   * Getting the taskgrouppanels on the tab
   */
  get taskGroupCollection(): TaskGroupCollection {
    return this._taskGroupCollection;
  }

  /**
   * Has taskgroups
   */
  hasTaskGroups() {
    return this.taskGroupCollection && this.taskGroupCollection.hasItems;
  }

  get isStagesView(): boolean {
    return this.layouthint.has(STAGESVIEW);
  }
  /**
   * Indicates if the panels of this caseview should be rendered as tabs
   */
  renderPanelsAsTab() {
    const hasMultipleGroupPanels =
      this.links.links.filter(link => link.resourcetype === "GroupingPanel")
        .length > 1;

    return (
      !this.layouthint.has(OVERVIEW) &&
      (hasMultipleGroupPanels ||
        this.isStagesView ||
        this.layouthint.has(PANELS_AS_TABS))
    );
  }

  /**
   * Replace a panel in the panel collection of the caseview
   */
  replacePanel(replacePanelHref: Href, newPanel: PanelType) {
    const clonedCaseView = this.clone();

    clonedCaseView.panelCollection.replace(replacePanelHref, newPanel);

    return clonedCaseView;
  }
}
