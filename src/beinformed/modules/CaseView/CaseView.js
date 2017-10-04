// @flow
import React from "react";
import classNames from "classnames";
import Helmet from "react-helmet";

import CaseHeader from "beinformed/modules/CaseHeader/CaseHeader";
import FormattedText from "beinformed/modules/FormattedText/FormattedText";
import CaseViewPanels from "beinformed/modules/CaseView/CaseViewPanels";
import TaskGroupPanels from "beinformed/modules/TaskGroup/TaskGroupPanels";
import {
  DAP_ACTIVITIES_EXECUTABLE,
  DAP_ACTIVITIES_PERFORMED
} from "beinformed/constants/LayoutHints";
import type CaseViewModel from "beinformed/models/caseview/CaseViewModel";
import type Href from "beinformed/models/href/Href";

type CaseViewProps = {
  caseview: CaseViewModel,
  onPanelTabClick: (href: Href) => void
};

/**
 * Rendering of a CaseView
 */
const CaseView = ({ caseview, onPanelTabClick }: CaseViewProps) => {
  const mainPanelClass = classNames({
    "col-md-9 col-xl-10": caseview.taskGroupCollection.hasItems,
    "col-md-12": !caseview.taskGroupCollection.hasItems
  });

  const caseName = caseview.casename ? caseview.casename.value : "";

  return (
    <div className="caseview">
      <Helmet>
        <title>{caseName}</title>
      </Helmet>
      <CaseHeader
        name={caseview.casename}
        type={caseview.casetype}
        owner={caseview.owner}
        status={caseview.status}
        properties={caseview.attributeCollection.all}
      />
      <div className="row">
        <div className={mainPanelClass}>
          {caseview.introtext && (
            <FormattedText className="introtext" text={caseview.introtext} />
          )}

          {caseview.panelCollection.hasItems && (
            <CaseViewPanels
              caseview={caseview}
              onPanelTabClick={onPanelTabClick}
            />
          )}
        </div>
        {caseview.taskGroupCollection.hasItems && (
          <TaskGroupPanels
            className="col-md-3 col-xl-2"
            taskGroupPanels={caseview.taskGroupCollection}
            executableActivities={caseview.attributeCollection.getChoiceAttributeByLayoutHint(
              DAP_ACTIVITIES_EXECUTABLE
            )}
            performedActivities={caseview.attributeCollection.getChoiceAttributeByLayoutHint(
              DAP_ACTIVITIES_PERFORMED
            )}
          />
        )}
      </div>
    </div>
  );
};

export default CaseView;
