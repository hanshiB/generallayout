// @flow
import { server as beinformedServer } from "beinformed/server";

export const server = (request: HttpServletRequestJava) =>
  beinformedServer({ request });
