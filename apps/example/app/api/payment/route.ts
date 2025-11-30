import { track } from "nebulatics/server";
import { getFlags } from "../../../lib/queries";

export async function GET(request: Request) {
  const flags = await getFlags();
  console.log("flags: ", flags);
  await track({ name: "payment", flags });
  console.log("payment");
  return new Response("Hello, world!");
}
