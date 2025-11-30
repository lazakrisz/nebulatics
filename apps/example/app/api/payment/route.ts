import { getProviderData } from "flags/next";
import { track } from "nebulatics/server";
import { getFlags } from "../../../lib/queries";

export async function GET(request: Request) {
  const flags = getFlags();
  console.log("flags: ", flags);
  await track({ name: "payment" });
  console.log("payment");
  return new Response("Hello, world!");
}
