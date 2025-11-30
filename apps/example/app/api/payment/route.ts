import { testing } from "nebulatics/server";

export async function GET(request: Request) {
  testing();
  console.log("payment");
  return new Response("Hello, world!");
}
