// @flow
import React from "react";
import classNames from "classnames";

import "./ProgressIndicator.scss";

export type ProgressIndicatorProps = {
  count: number,
  timestamp: number,
  percentComplete?: number
};

/**
 * Progress indicator
 */
const ProgressIndicator = ({
  timestamp = 0,
  count = 0
}: ProgressIndicatorProps) => {
  const isInProgress = count !== 0;
  const isFinished = count === 0;

  const indicatorClass = classNames("progress-indicator", {
    inprogress: isInProgress,
    finished: isFinished
  });

  return (
    <div
      id="progress-indicator"
      className={indicatorClass}
      data-timestamp={timestamp}
      data-count={count}
    />
  );
};

export default ProgressIndicator;
