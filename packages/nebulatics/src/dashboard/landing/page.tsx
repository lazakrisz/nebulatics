import { headers } from "next/headers";

export async function LandingPage() {
  const headersStore = await headers();
  const headersArray = Array.from(headersStore.entries());
  console.log("headersArray", headersArray);

  return <div>LandingPage</div>;
}
