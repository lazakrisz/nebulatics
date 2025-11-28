import { LandingPage } from "nebulatics/dashboard";
import { headers } from "next/headers";

export default async function TestingPage() {
  const headersStore = await headers();

  console.log("headersStore", Array.from(headersStore.entries()));

  return <LandingPage />;
}
