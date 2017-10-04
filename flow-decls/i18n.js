declare type ConstraintParametersType = MessageParametersType;

declare type MessageParametersType = {
  [parameterName: string]: string | number
};
declare type messageFunctionType = (
  id: string,
  defaultMessage?: string,
  parameters?: MessageParametersType
) => string;
