// @flow
import React from "react";
import classNames from "classnames";

import CloseButton from "beinformed/modules/Button/CloseButton";
import PanelBody from "beinformed/modules/Panel/PanelBody";

import "./Panel.scss";

type PanelProps = {
  children?: any,
  className?: string,
  dataId?: string,
  showClose?: boolean,
  onClose?: (e: SyntheticEvent<*>) => void
};

/**
 * render Panel
 */
const Panel = ({
  className,
  children,
  dataId,
  showClose,
  onClose
}: PanelProps) => {
  const hasPanelBodyChild =
    children && !Array.isArray(children) && children.type !== PanelBody;

  const panelClass = classNames("panel", className, {
    "panel-body": hasPanelBodyChild
  });

  return (
    <div data-id={dataId} className={panelClass}>
      {showClose && onClose && <CloseButton onClose={onClose} />}
      {children}
    </div>
  );
};

export default Panel;
