// @flow
import type { ResolvableModels } from "beinformed/modularui/resolveModel";
import BaseModel from "beinformed/models/base/BaseModel";
import Href from "beinformed/models/href/Href";
import { ICON } from "beinformed/constants/LayoutHints";

/**
 * Defines a Link. For instance below example of a link to the tab 'books'
 * <br/>
 * "Books": {
        "href": "/books",
        "profile": "/profiles/tab"
      }
 *
 */
class LinkModel extends BaseModel {
  _href: Href;
  _icon: string;
  _targetModel: ?Class<ResolvableModels>;
  _isCacheable: boolean;

  /**
   * Create a Link
   */
  constructor(data: LinkJSON, contributions: LinkContributionsJSON) {
    super(data, contributions);

    this._href = new Href(this.data.href);
    this._isCacheable = false;
  }

  /**
   * Create a simple Link Model
   */
  static create(name: string, href: string, label: string): LinkModel {
    return new this(
      {
        name,
        href
      },
      {
        label
      }
    );
  }

  /**
   * Getting link group
   */
  get group(): string {
    return this.contributions.group || this.data.group;
  }

  /**
   * Getting the key/name of this link
   */
  get key(): string {
    return this.data.name;
  }

  /**
   * Retrieve the href of the link
   */
  get href(): Href {
    return this._href;
  }

  /**
   * Set the href of the Link
   */
  set href(href: Href) {
    this._href = href;
  }

  /**
   * Getting the label of the link
   */
  get label(): string {
    return this.contributions.label || this.key;
  }

  /**
   * Getting the type of the link
   */
  get resourcetype(): string {
    return this.contributions.resourcetype || "";
  }

  /**
   * Check if the href startswith the URI of the given href
   */
  isActive(link: LinkModel): boolean {
    return link && link.href.startsWith(this.href);
  }

  /**
   * Setter for icon of LinkModel
   * @param  {string} icon Name of icon, see {@link http://fontawesome.io/icons/|font-awesome} for supported icons
   */
  set icon(icon: string) {
    this._icon = icon;
  }

  /**
   * Retrieve icon of LinkModel
   */
  get icon(): string {
    if (this._icon) {
      return this._icon;
    }

    const hasIcon = this.layouthint.has(ICON);

    if (hasIcon) {
      const icon = this.layouthint.getByLayoutHint(ICON);

      return icon ? icon.substr(ICON.length + 1) : "";
    }

    return "";
  }

  get targetModel(): ?Class<ResolvableModels> {
    return this._targetModel;
  }

  set targetModel(targetModel: Class<ResolvableModels>) {
    this._targetModel = targetModel;
  }

  get isCacheable(): boolean {
    return this._isCacheable;
  }

  set isCacheable(isCacheable: boolean) {
    this._isCacheable = isCacheable;
  }
}

export default LinkModel;
