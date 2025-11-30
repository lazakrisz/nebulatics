import "server-only";
import { getProviderData } from "flags/next";
import * as flags from "../flags";

export function getFlags() {
  return getProviderData(flags);
}
