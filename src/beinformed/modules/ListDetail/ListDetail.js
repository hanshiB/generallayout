// @flow
import React from "react";
import classNames from "classnames";

import AttributeList from "beinformed/modules/AttributeList/AttributeList";
import AttributeValue from "beinformed/modules/AttributeList/AttributeValue";
import KeepInView from "beinformed/modules/KeepInView/KeepInView";
import Panels from "beinformed/modules/Panel/Panels";
import Panel from "beinformed/modules/Panel/Panel";
import PanelBody from "beinformed/modules/Panel/PanelBody";
import PanelTitle from "beinformed/modules/Panel/PanelTitle";

import ListDetailInstrumentResult from "beinformed/modules/ListDetail/ListDetailInstrumentResult";

import ListDetailFooter from "beinformed/modules/ListDetail/ListDetailFooter";

import "./ListDetail.scss";

import type ListDetailModel from "beinformed/models/list/ListDetailModel";
import type Href from "beinformed/models/href/Href";

type ListDetailProps = {
  className?: string,
  detail: ListDetailModel,
  keepInView?: boolean,
  onOpenCase?: (href: Href) => void
};

/**
 * Render detail of a list link item
 */
const ListDetail = ({
  className,
  detail,
  keepInView,
  onOpenCase
}: ListDetailProps) => (
  <KeepInView
    className={classNames("list-detail", className)}
    dataId={detail.id}
    enabled={keepInView}
  >
    <Panel className="list-detail-main card">
      <PanelBody className="card-body">
        <PanelTitle>
          <AttributeValue attribute={detail.titleAttribute} />
        </PanelTitle>
        <AttributeList attributes={detail.attributeCollection.all} />

        {detail.hasResults && <ListDetailInstrumentResult detail={detail} />}
      </PanelBody>
      {(detail.actionCollection.length > 0 || detail.isCase()) && (
        <ListDetailFooter detail={detail} onOpenCase={onOpenCase} />
      )}
    </Panel>
    <Panels panels={detail.panelCollection} />
  </KeepInView>
);

export default ListDetail;
