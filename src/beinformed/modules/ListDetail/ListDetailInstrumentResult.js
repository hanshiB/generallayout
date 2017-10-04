// @flow
import React from "react";

import { Message } from "beinformed/modules/I18n/Message";

import AttributeValue from "beinformed/modules/AttributeList/AttributeValue";

import type ListDetailModel from "beinformed/models/list/ListDetailModel";

type ListDetailInstrumentResultProps = {
  detail: ListDetailModel
};

const ListDetailInstrumentResult = ({
  detail
}: ListDetailInstrumentResultProps) => (
  <div className="instrument-result attributelist">
    {detail.results && (
      <div className="instrument-result-results mt-4 attribute">
        <div className="attribute-label font-weight-bold">
          <Message
            id="ListDetailInstrumentResult.ResultTitle"
            defaultMessage="Result"
          />
        </div>
        <AttributeValue attribute={detail.results} />
      </div>
    )}

    {detail.givenAnswers && (
      <div className="instrument-result-givenanswers mt-4 attribute">
        <div className="attribute-label font-weight-bold">
          <Message
            id="ListDetailInstrumentResult.GivenAnswerTitle"
            defaultMessage="Given answers"
          />
        </div>
        <AttributeValue attribute={detail.givenAnswers} />
      </div>
    )}
  </div>
);

export default ListDetailInstrumentResult;
