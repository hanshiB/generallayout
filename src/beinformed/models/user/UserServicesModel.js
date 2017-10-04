// @flow
import type LinkModel from "beinformed/models/links/LinkModel";
import ResourceModel from "beinformed/models/base/ResourceModel";
import UserModel from "beinformed/models/user/UserModel";

/**
 * UserServicesModel model
 */
export default class UserServicesModel extends ResourceModel {
  _user: UserModel | null;

  /**
   * @overwrite
   */
  get type(): string {
    return "UserServices";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "user_services"
    );
  }

  /**
   * return the user for the current user
   */
  get user(): UserModel | null {
    return this._user || null;
  }

  /**
   * Set user data
   */
  set user(user: UserModel | null) {
    this._user = user;
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    return this.links.getLinksByGroup("component").all;
  }

  /**
   * @override
   */
  setChildModels() {
    const userModel = this.childModels.find(model => model.type === "User");
    if (userModel) {
      this.user = userModel;
    }
  }

  /**
   * Getting the label of the application
   */
  get label(): string {
    return this.contributions.label || "";
  }

  /**
   * Getting the userData links
   */
  get userDataLink(): LinkModel | null {
    return this.links.getLinksByGroup("component").getLinkByKey("Userdata");
  }
}
