// @flow
import ContentLinkModel from "beinformed/models/content/ContentLinkModel";

class SourceReferenceItemModel {
  _sourceReference: any;
  _sourceReferenceType: any;
  _entryDate: string | null;

  constructor(
    sourceReference: any,
    sourceReferenceType: any,
    entryDate: string | null = null
  ) {
    this._sourceReference = sourceReference;
    this._sourceReferenceType = sourceReferenceType;
    this._entryDate = entryDate;
  }

  get link(): ContentLinkModel {
    return new ContentLinkModel(this._sourceReference, this._entryDate);
  }

  get type(): string {
    return this._sourceReference.type;
  }
}

export default SourceReferenceItemModel;
